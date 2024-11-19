import { Request, Response } from 'express';
import { Correspondence, CorrespondenceI } from '../models/Correspondence';
import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { CorrespondenceType } from '../models/CorrespondenceType';
import { CorrespondenceState } from '../models/CorrespondenceState';
import { Branch } from '../models/Branch';
import { Transport } from '../models/Transport';

/**
 * CorrespondenceController class that handles requests related to correspondence.
 */
export class CorrespondenceController {
    /**
     * Retrieve all correspondence records from the database, including associated data.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllCorrespondence(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all correspondence including associated user, employee, and correspondence types
            const correspondences: CorrespondenceI[] = await Correspondence.findAll({
                include: [
                    { model: User, as: "sender" },
                    { model: User, as: "recipient" },
                    { model: Employee, as: "employee" },
                    { model: CorrespondenceType, as: "correspondenceType" },
                    { model: CorrespondenceState, as: "correspondenceState" },
                    { model: Branch, as: "originBranch" },
                    { model: Branch, as: "destinationBranch" },
                    { model: Transport, as: "transport" }
                ]
            });
            res.status(200).json({ correspondences });
        } catch (error) {
            console.error('Error in getAllCorrespondence:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Retrieve a single correspondence record by ID, including associated data.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            // Find correspondence by ID including associated data
            const correspondence: CorrespondenceI | null = await Correspondence.findOne({
                where: { id },
                include: [
                    { model: User, as: "sender" },
                    { model: User, as: "recipient" },
                    { model: Employee, as: "employee" },
                    { model: CorrespondenceType, as: "correspondenceType" },
                    { model: CorrespondenceState, as: "correspondenceState" },
                    { model: Branch, as: "originBranch" },
                    { model: Branch, as: "destinationBranch" },
                    { model: Transport, as: "transport" }
                ]
            });
            if (correspondence) {
                res.status(200).json({ correspondence });
            } else {
                res.status(404).json({ msg: "The correspondence does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneCorrespondence:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Create a new correspondence record in the database.
     * @param req - The request object containing correspondence data.
     * @param res - The response object.
     */
    public async createCorrespondence(req: Request, res: Response): Promise<void> {
        const { senderId, recipientId, employeeId, correspondenceTypeId, correspondenceStateId, originBranchId, destinationBranchId, transportId, sendDate, deliveryDate, description } = req.body;

        try {
            // Create a new correspondence
            const newCorrespondence: CorrespondenceI = await Correspondence.create({
                senderId,
                recipientId,
                employeeId,
                correspondenceTypeId,
                correspondenceStateId,
                originBranchId,
                destinationBranchId,
                transportId,
                sendDate,
                deliveryDate,
                description
            });
            res.status(201).json({ newCorrespondence });
        } catch (error) {
            console.error('Error in createCorrespondence:', error);
            res.status(500).json({ msg: "Error creating the correspondence" });
        }
    }

    /**
     * Update an existing correspondence record by ID.
     * @param req - The request object containing the correspondence ID and data to update.
     * @param res - The response object.
     */
    public async updateCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { senderId, recipientId, employeeId, correspondenceTypeId, correspondenceStateId, originBranchId, destinationBranchId, transportId, sendDate, deliveryDate, description } = req.body;

        try {
            const existingCorrespondence: CorrespondenceI | null = await Correspondence.findByPk(id);
            if (!existingCorrespondence) {
                res.status(404).json({ msg: "The correspondence does not exist" });
                return;
            }

            // Update the correspondence's details
            await Correspondence.update({
                senderId,
                recipientId,
                employeeId,
                correspondenceTypeId,
                correspondenceStateId,
                originBranchId,
                destinationBranchId,
                transportId,
                sendDate,
                deliveryDate,
                description
            }, { where: { id } });
            const updatedCorrespondence: CorrespondenceI | null = await Correspondence.findByPk(id);
            res.status(200).json({ correspondence: updatedCorrespondence });
        } catch (error) {
            console.error('Error in updateCorrespondence:', error);
            res.status(500).json({ msg: "Error updating the correspondence" });
        }
    }

    /**
     * Delete a correspondence record by ID.
     * @param req - The request object containing the correspondence ID.
     * @param res - The response object.
     */
    public async deleteCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingCorrespondence: CorrespondenceI | null = await Correspondence.findByPk(id);
            if (!existingCorrespondence) {
                res.status(404).json({ msg: "The correspondence does not exist" });
                return;
            }

            // Delete the correspondence
            await Correspondence.destroy({ where: { id } });
            res.status(200).json({ msg: "Correspondence Deleted" });
        } catch (error) {
            console.error('Error in deleteCorrespondence:', error);
            res.status(500).json({ msg: "Error deleting the correspondence" });
        }
    }
}
