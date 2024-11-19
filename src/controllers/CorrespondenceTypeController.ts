import { Request, Response } from 'express';
import { CorrespondenceType, CorrespondenceTypeI } from '../models/CorrespondenceType';

/**
 * Controller for managing correspondence types.
 */
export class CorrespondenceTypeController {
    /**
     * Get all correspondence types from the database.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllCorrespondenceTypes(req: Request, res: Response): Promise<void> {
        try {
            const types: CorrespondenceTypeI[] = await CorrespondenceType.findAll();
            res.status(200).json({ types });
        } catch (error) {
            console.error('Error in getAllCorrespondenceTypes:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get a single correspondence type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneCorrespondenceType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const type: CorrespondenceTypeI | null = await CorrespondenceType.findOne({ where: { id } });
            if (type) {
                res.status(200).json({ type });
            } else {
                res.status(404).json({ msg: "Correspondence type does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneCorrespondenceType:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Create a new correspondence type.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async createCorrespondenceType(req: Request, res: Response): Promise<void> {
        const { type } = req.body;

        try {
            const newType: CorrespondenceTypeI = await CorrespondenceType.create({ type });
            res.status(201).json({ newType });
        } catch (error) {
            console.error('Error in createCorrespondenceType:', error);
            res.status(500).json({ msg: "Error creating correspondence type" });
        }
    }

    /**
     * Update a correspondence type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async updateCorrespondenceType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { type } = req.body;

        try {
            const existingType: CorrespondenceTypeI | null = await CorrespondenceType.findByPk(id);
            if (!existingType) {
                res.status(404).json({ msg: "Correspondence type does not exist" });
                return;
            }

            await CorrespondenceType.update({ type }, { where: { id } });
            const updatedType: CorrespondenceTypeI | null = await CorrespondenceType.findByPk(id);
            res.status(200).json({ type: updatedType });
        } catch (error) {
            console.error('Error in updateCorrespondenceType:', error);
            res.status(500).json({ msg: "Error updating correspondence type" });
        }
    }

    /**
     * Delete a correspondence type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async deleteCorrespondenceType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingType: CorrespondenceTypeI | null = await CorrespondenceType.findByPk(id);
            if (!existingType) {
                res.status(404).json({ msg: "Correspondence type does not exist" });
                return;
            }

            await CorrespondenceType.destroy({ where: { id } });
            res.status(200).json({ msg: "Correspondence type deleted" });
        } catch (error) {
            console.error('Error in deleteCorrespondenceType:', error);
            res.status(500).json({ msg: "Error deleting correspondence type" });
        }
    }
}
