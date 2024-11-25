// Import dependencies from the 'express' library
import { Request, Response } from 'express';

// Import the User model, which represents the user entity in the application
import { User } from '../models/User';

// Import the RefreshToken model, which is used to handle refresh tokens for users
import { RefreshToken } from '../models/RefreshToken';

// Import the UserUserType model to manage the relationship between users and their user types
import { UserUserType } from '../models/UserUserType';

// Import the UserType model, which defines different types of users (e.g., admin, regular user)
import { UserType } from '../models/UserType';

// Define the AuthController class, which contains logic for handling authentication-related operations
export class AuthController {
  /**
   * Handles the user registration process.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      // Destructure relevant fields from the request body
      const { username, email, password, is_active, avatar, userTypeId } = req.body;

      // Create a new user in the database using the User model
      const user_interface: User = await User.create({ username, email, password, is_active, avatar });
      
      // If a user type ID is provided, create an association between the user and the user type
      if (userTypeId) {
        await UserUserType.create({
          userId: user_interface.id, // Associate the user ID
          userTypeId,               // Specify the user type ID
          status: true,             // Set the status of the relationship as active
        });
      }

      // Generate an authentication token for the newly created user
      const token = user_interface.generateToken();

      // Generate a refresh token for the user
      const refreshToken = user_interface.generateRefreshToken();

      // Store the refresh token in the database, associating it with the user
      await RefreshToken.create({
        user_id: user_interface.id,        // Associate with the user ID
        token: refreshToken.token,        // Store the token value
        device_info: req.headers['user-agent'] || 'unknown', // Capture device information from the request headers
        is_valid: true,                   // Mark the token as valid
        expires_at: refreshToken.expiresAt // Set the expiration date for the token
      });

      // Respond with the created user data and the generated authentication token
      res.status(201).json({ user_interface, token });
    } catch (error) {
      // Handle errors by responding with a 500 status code and an error message
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  }

  /**
   * Handles the user login process.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      // Destructure email and password from the request body
      const { email, password } = req.body;

      // Find an active user with the specified email
      const user: User | null = await User.findOne({
        where: { 
          email,           // Match the email
          is_active: true  // Ensure the user is active
        }
      });

      // If no user is found or the password is incorrect, respond with an error
      if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      // Generate an authentication token for the user
      const token = user.generateToken();

      // Generate a refresh token for the user, including its expiration date
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();

      // Store the refresh token in the database
      await RefreshToken.create({
        user_id: user.id,                   // Associate with the user ID
        token: refreshToken,               // Store the token value
        device_info: req.headers['user-agent'] || 'unknown', // Capture device information
        is_valid: true,                    // Mark the token as valid
        expires_at: expiresAt              // Set the expiration date
      });

      // Respond with the user data and the generated authentication token
      res.status(200).json({ user, token });
    } catch (error) {
      // Handle errors by responding with a 500 status code and an error message
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }
}
