import { Request, Response } from 'express';
import { UserUserType } from '../models/UserUserType'; // Modelo de la nueva tabla
import { User } from '../models/User'; // Modelo de usuarios
import { UserType } from '../models/UserType'; // Modelo de tipos de usuario

export class UserUserTypeController {
    // Obtener todas las relaciones
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const relationships = await UserUserType.findAll({
                include: [
                    { model: User, attributes: ['name', 'email'], as: 'user' },
                    { model: UserType, attributes: ['description'], as: 'userType' },
                ],
            });
            res.status(200).json({ relationships });
        } catch (error) {
            console.error('Error in getAll:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    // Crear una nueva relación
    public async create(req: Request, res: Response): Promise<void> {
        const { userId, userTypeId, status } = req.body;

        try {
            const relationship = await UserUserType.create({ userId, userTypeId, status });
            res.status(201).json({ relationship });
        } catch (error) {
            console.error('Error in create:', error);
            res.status(500).json({ msg: "Error creating relationship" });
        }
    }

    // Actualizar una relación existente
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { userId, userTypeId, status } = req.body;

        try {
            const existingRelationship = await UserUserType.findByPk(id);

            if (!existingRelationship) {
                res.status(404).json({ msg: "The relationship does not exist" });
            } else {
                await UserUserType.update({ userId, userTypeId, status }, { where: { id } });
                const updatedRelationship = await UserUserType.findByPk(id);
                res.status(200).json({ updatedRelationship });
            }
        } catch (error) {
            console.error('Error in update:', error);
            res.status(500).json({ msg: "Error updating relationship" });
        }
    }

    // Eliminar una relación
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingRelationship = await UserUserType.findByPk(id);

            if (!existingRelationship) {
                res.status(404).json({ msg: "The relationship does not exist" });
            } else {
                await UserUserType.destroy({ where: { id } });
                res.status(200).json({ msg: "Relationship deleted" });
            }
        } catch (error) {
            console.error('Error in delete:', error);
            res.status(500).json({ msg: "Error deleting relationship" });
        }
    }
}
