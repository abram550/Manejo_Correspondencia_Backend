import { Request, Response } from 'express';
import { User, UserI } from '../models/User';
import { UserType } from '../models/UserType';
import { UserUserType } from '../models/UserUserType'; // Nueva tabla intermedia
import bcrypt from 'bcryptjs';

export class UserController {
    // Test method to check the connection
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for User');
        } catch (error) {
            res.status(500).json({ msg: "Internal error" });
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UserI[] = await User.findAll({
                include: [
                    {
                        model: UserType, // Modelo relacionado
                        as: 'userType', // Alias de la asociación
                        attributes: ['description'], // Campos a incluir
                    },
                ],
                attributes: { exclude: ['userTypeId'] }, // Excluir userTypeId
            });
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ msg: 'Internal error' });
        }
    }
    // Get a single user by ID
    public async getOneUser(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const user: UserI | null = await User.findOne({
                where: { id: parseInt(idParam) },
                include: [
                    {
                        model: UserType,
                        as: 'userType',
                        attributes: ['description'],
                    },
                ],
                attributes: { exclude: ['userTypeId'] },
            });
    
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ msg: 'The User does not exist' });
            }
        } catch (error) {
            console.error('Error in getOneUser:', error);
            res.status(500).json({ msg: 'Internal error' });
        }
    }

    // Create a new user
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, address, email, phone, password, avatar } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                address,
                email,
                phone,
                password: hashedPassword,
                avatar,
            });
            res.status(201).json({ user });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ msg: "Error creating user" });
        }
    }

    // Update an existing user
    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { name, address, email, phone, userTypeId, password, avatar } = req.body;

        try {
            const existingUser: UserI | null = await User.findByPk(pk);

            if (!existingUser) {
                res.status(404).json({ msg: "The User does not exist" });
            } else {
                let updatedFields: any = { name, address, email, phone, userTypeId, avatar };
                
                // If password is provided, hash it before updating
                if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    updatedFields.password = hashedPassword; // Hash the password before updating
                }

                await User.update(updatedFields, { where: { id: pk } });
                const user: UserI | null = await User.findByPk(pk);
                res.status(200).json({ user });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ msg: "Error updating user" });
        }
    }

    // Delete a user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const existingUser: UserI | null = await User.findByPk(pk);
            if (!existingUser) {
                res.status(404).json({ msg: "The User does not exist" });
            } else {
                await User.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "User Deleted" });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ msg: "Error deleting user" });
        }
    }

    // Get all users (alternative method)
    public async getAllUsersAlternative(req: Request, res: Response): Promise<void> { 
        try {
            const users: UserI[] = await User.findAll({
                include: {
                    model: UserType,
                    as: 'userType',
                    attributes: ['description'] // Show only the description
                },
                attributes: { exclude: ['userTypeId'] } // Exclude user type ID
            });
    
            res.status(200).json(users); // Return the array directly
        } catch (error) {
            console.error('Error in getAllUsersAlternative:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }
    
    // Get a user by ID (alternative method)
    public async getUserById(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const user: UserI | null = await User.findOne({
                where: { id: parseInt(idParam) },
                include: {
                    model: UserType,
                    as: 'userType',
                    attributes: ['description']
                },
                attributes: { exclude: ['userTypeId'] }
            });
    
            if (user) {
                res.status(200).json(user); // Return the object directly
            } else {
                res.status(404).json({ msg: "The User does not exist" });
            }
        } catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }
}
