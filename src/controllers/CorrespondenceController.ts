import { Request, Response } from 'express';
import { Correspondence, CorrespondenceI } from '../models/Correspondence';
import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { CorrespondenceType } from '../models/CorrespondenceType';
import { CorrespondenceState } from '../models/CorrespondenceState';
import { Branch } from '../models/Branch';
import { Transport } from '../models/Transport';

/**
 * Handles operations related to correspondence records.
 * This controller includes methods for CRUD operations
 * and includes associated data where necessary.
 */
export class CorrespondenceController {
    /**
     * Fetches all correspondence records along with associated data.
     * Includes sender, recipient, employee, correspondence type, state,
     * origin and destination branches, and transport information.
     * 
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     */
    public async getAllCorrespondence(req: Request, res: Response): Promise<void> {
        try {
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
            console.error('Error fetching all correspondence:', error);
            res.status(500).json({ msg: "Internal server error while fetching correspondences" });
        }
    }

    /**
     * Fetches a single correspondence record by its unique ID.
     * Also includes associated data such as sender, recipient,
     * and correspondence type information.
     * 
     * @param req - The HTTP request object with the correspondence ID in params.
     * @param res - The HTTP response object.
     */
    public async getOneCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
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
                res.status(404).json({ msg: "Correspondence not found" });
            }
        } catch (error) {
            console.error('Error fetching correspondence by ID:', error);
            res.status(500).json({ msg: "Internal server error while fetching correspondence" });
        }
    }

    /**
     * Creates a new correspondence record in the database.
     * Accepts correspondence details in the request body.
     * 
     * @param req - The HTTP request object containing correspondence data in the body.
     * @param res - The HTTP response object.
     */
    public async createCorrespondence(req: Request, res: Response): Promise<void> {
        const {
            senderId, recipientId, employeeId, correspondenceTypeId,
            correspondenceStateId, originBranchId, destinationBranchId,
            transportId, sendDate, deliveryDate, description
        } = req.body;

        try {
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
            console.error('Error creating correspondence:', error);
            res.status(500).json({ msg: "Internal server error while creating correspondence" });
        }
    }

    /**
     * Updates an existing correspondence record by ID.
     * Accepts correspondence details and ID from request.
     * 
     * @param req - The HTTP request object containing ID in params and data in body.
     * @param res - The HTTP response object.
     */
    public async updateCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const {
            senderId, recipientId, employeeId, correspondenceTypeId,
            correspondenceStateId, originBranchId, destinationBranchId,
            transportId, sendDate, deliveryDate, description
        } = req.body;

        try {
            const existingCorrespondence: CorrespondenceI | null = await Correspondence.findByPk(id);
            if (!existingCorrespondence) {
                res.status(404).json({ msg: "Correspondence not found" });
                return;
            }

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
            console.error('Error updating correspondence:', error);
            res.status(500).json({ msg: "Internal server error while updating correspondence" });
        }
    }

    /**
     * Deletes a correspondence record from the database by its ID.
     * 
     * @param req - The HTTP request object containing correspondence ID in params.
     * @param res - The HTTP response object.
     */
    public async deleteCorrespondence(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingCorrespondence: CorrespondenceI | null = await Correspondence.findByPk(id);
            if (!existingCorrespondence) {
                res.status(404).json({ msg: "Correspondence not found" });
                return;
            }

            await Correspondence.destroy({ where: { id } });
            res.status(200).json({ msg: "Correspondence successfully deleted" });
        } catch (error) {
            console.error('Error deleting correspondence:', error);
            res.status(500).json({ msg: "Internal server error while deleting correspondence" });
        }
    }
}
