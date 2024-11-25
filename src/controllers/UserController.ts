import { Request, Response } from 'express';
import { User, UserI } from '../models/User';

export class UserController {
    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for User');
        } catch (error) {
            res.status(500).json({ msg: "Internal error" });
        }
    }

    // Obtener todos los usuarios
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: UserI[] = await User.findAll({
                attributes: { exclude: ['password'] }, // Excluir la contraseña de los resultados
            });
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ msg: 'Internal error' });
        }
    }

    // Obtener un usuario por ID
    public async getOneUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user: UserI | null = await User.findOne({
                where: { id: parseInt(id) },
                attributes: { exclude: ['password'] }, // Excluir la contraseña
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

    // Crear un nuevo usuario
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, address, email, phone, password, avatar } = req.body;

        try {
            const user = await User.create({
                name,
                address,
                email,
                phone,
                password, // El hook `beforeCreate` se encargará de hashear la contraseña
                avatar,
            });
            res.status(201).json({ user });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ msg: "Error creating user" });
        }
    }

    // Actualizar un usuario existente
    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, address, email, phone, password, avatar } = req.body;

        try {
            const existingUser: UserI | null = await User.findByPk(id);

            if (!existingUser) {
                res.status(404).json({ msg: "The User does not exist" });
            } else {
                let updatedFields: Partial<UserI> = { name, address, email, phone, avatar };

                // Si se proporciona una nueva contraseña, incluirla en los campos actualizados
                if (password) {
                    updatedFields.password = password; // El hook `beforeUpdate` manejará el hasheo
                }

                await User.update(updatedFields, { where: { id: parseInt(id) } });
                const user: UserI | null = await User.findByPk(id, {
                    attributes: { exclude: ['password'] }, // Excluir la contraseña
                });
                res.status(200).json({ user });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ msg: "Error updating user" });
        }
    }

    // Eliminar un usuario
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingUser: UserI | null = await User.findByPk(id);
            if (!existingUser) {
                res.status(404).json({ msg: "The User does not exist" });
            } else {
                await User.destroy({ where: { id: parseInt(id) } });
                res.status(200).json({ msg: "User Deleted" });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ msg: "Error deleting user" });
        }
    }
}
