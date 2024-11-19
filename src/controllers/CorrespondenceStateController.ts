import { Request, Response } from 'express';
import { CorrespondenceState, CorrespondenceStateI } from '../models/CorrespondenceState';

/**
 * Controller for managing correspondence states.
 */
export class CorrespondenceStateController {
    /**
     * Get all correspondence states from the database.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllStates(req: Request, res: Response): Promise<void> {
        try {
            // Retrieve all correspondence states from the database
            const states: CorrespondenceStateI[] = await CorrespondenceState.findAll();
            res.status(200).json({ states });
        } catch (error) {
            console.error('Error in getAllStates:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get a single correspondence state by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneState(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const state: CorrespondenceStateI | null = await CorrespondenceState.findOne({ where: { id: parseInt(id) } });
            if (state) {
                res.status(200).json({ state });
            } else {
                res.status(404).json({ msg: "The state does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneState:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Create a new correspondence state.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async createState(req: Request, res: Response): Promise<void> {
        const { state } = req.body;

        try {
            const newState: CorrespondenceStateI = await CorrespondenceState.create({ state });
            res.status(201).json({ newState });
        } catch (error) {
            console.error('Error in createState:', error);
            res.status(500).json({ msg: "Error creating the state" });
        }
    }

    /**
     * Update an existing correspondence state by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async updateState(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { state } = req.body;

        try {
            const existingState: CorrespondenceStateI | null = await CorrespondenceState.findByPk(id);
            if (!existingState) {
                res.status(404).json({ msg: "The state does not exist" });
                return;
            }

            await CorrespondenceState.update({ state }, { where: { id } });
            const updatedState: CorrespondenceStateI | null = await CorrespondenceState.findByPk(id);
            res.status(200).json({ state: updatedState });
        } catch (error) {
            console.error('Error in updateState:', error);
            res.status(500).json({ msg: "Error updating the state" });
        }
    }

    /**
     * Delete a correspondence state by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async deleteState(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingState: CorrespondenceStateI | null = await CorrespondenceState.findByPk(id);
            if (!existingState) {
                res.status(404).json({ msg: "The state does not exist" });
                return;
            }

            await CorrespondenceState.destroy({ where: { id } });
            res.status(200).json({ msg: "State deleted" });
        } catch (error) {
            console.error('Error in deleteState:', error);
            res.status(500).json({ msg: "Error deleting the state" });
        }
    }

    /**
     * Get all correspondence states from the database, returning an array directly.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllStatesDirect(req: Request, res: Response): Promise<void> {
        try {
            const states: CorrespondenceStateI[] = await CorrespondenceState.findAll();
            res.status(200).json(states); // Changed to return an array directly
        } catch (error) {
            console.error('Error in getAllStatesDirect:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get a single correspondence state by ID, returning the object directly.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getStateById(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const state: CorrespondenceStateI | null = await CorrespondenceState.findOne({ where: { id: parseInt(idParam) } });

            if (state) {
                res.status(200).json(state); // Changed to return the object directly
            } else {
                res.status(404).json({ msg: "The state does not exist" });
            }
        } catch (error) {
            console.error('Error in getStateById:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }
}
