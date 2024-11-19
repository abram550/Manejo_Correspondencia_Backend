import { Request, Response } from 'express';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import { UserUserType } from '../models/UserUserType'; // Importar UserUserType
import { UserType } from '../models/UserType'; // Importar UserType

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, is_active, avatar, userTypeId } = req.body;

      // Crear el nuevo usuario
      const user_interface: User = await User.create({ username, email, password, is_active, avatar });
      
      // Asignar el UserType al nuevo usuario (creando un registro en UserUserType)
      if (userTypeId) {
        await UserUserType.create({
          userId: user_interface.id,
          userTypeId,
          status: true, // Asignar el estado activo
        });
      }

      const token = user_interface.generateToken();
      const refreshToken = user_interface.generateRefreshToken();

      // Crear un registro en RefreshToken
      await RefreshToken.create({
        user_id: user_interface.id,
        token: refreshToken.token,
        device_info: req.headers['user-agent'] || 'unknown',
        is_valid: true,
        expires_at: refreshToken.expiresAt
      });

      res.status(201).json({ user_interface, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user: User | null = await User.findOne({
        where: { 
          email,
          is_active: true 
        }
      });

      if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      const token = user.generateToken();
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();

      // Crear un nuevo registro en RefreshToken
      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        device_info: req.headers['user-agent'] || 'unknown',
        is_valid: true,
        expires_at: expiresAt
      });

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }
}
