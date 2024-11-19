import { Request, Response } from 'express';
import { Transport, TransportI } from '../models/Transport';
import { VehicleType } from '../models/VehicleType'; // Import the related model

/**
 * Class representing the transport controller.
 */
export class TransportController {
    /**
     * Get all transports.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllTransports(req: Request, res: Response): Promise<void> {
        try {
            const transports: TransportI[] = await Transport.findAll({
                include: [
                    {
                        model: VehicleType,
                        as: 'vehicleType', // Relation defined in the model
                    },
                ],
            });
            res.status(200).json({ transports });
        } catch (error) {
            console.error('Error in getAllTransports:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Get a specific transport by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneTransport(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const transport: TransportI | null = await Transport.findOne({
                where: { id },
                include: [
                    {
                        model: VehicleType,
                        as: 'vehicleType',
                    },
                ],
            });

            if (transport) {
                res.status(200).json({ transport });
            } else {
                res.status(404).json({ msg: "The transport does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneTransport:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Create a new transport.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async createTransport(req: Request, res: Response): Promise<void> {
        const { vehicleTypeId, plate, capacityKg } = req.body;

        try {
            const transport: TransportI = await Transport.create({ vehicleTypeId, plate, capacityKg });
            res.status(201).json({ transport });
        } catch (error) {
            console.error('Error in createTransport:', error);
            res.status(500).json({ msg: "Error creating the transport" });
        }
    }

    /**
     * Update an existing transport by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async updateTransport(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { vehicleTypeId, plate, capacityKg } = req.body;

        try {
            const existingTransport: TransportI | null = await Transport.findByPk(id);
            if (!existingTransport) {
                res.status(404).json({ msg: "The transport does not exist" });
                return;
            }

            await Transport.update({ vehicleTypeId, plate, capacityKg }, { where: { id } });
            const updatedTransport: TransportI | null = await Transport.findByPk(id);
            res.status(200).json({ transport: updatedTransport });
        } catch (error) {
            console.error('Error in updateTransport:', error);
            res.status(500).json({ msg: "Error updating the transport" });
        }
    }

    /**
     * Delete a transport by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async deleteTransport(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingTransport: TransportI | null = await Transport.findByPk(id);
            if (!existingTransport) {
                res.status(404).json({ msg: "The transport does not exist" });
                return;
            }

            await Transport.destroy({ where: { id } });
            res.status(200).json({ msg: "Transport deleted" });
        } catch (error) {
            console.error('Error in deleteTransport:', error);
            res.status(500).json({ msg: "Error deleting the transport" });
        }
    }

    /**
     * Get all transports (alternative method).
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllTransportsAlt(req: Request, res: Response): Promise<void> {
        try {
            const transports: TransportI[] = await Transport.findAll({
                include: [
                    {
                        model: VehicleType,
                        as: 'vehicleType', // Relation defined in the model
                    },
                ],
            });
            res.status(200).json(transports); // Changed to return the array directly
        } catch (error) {
            console.error('Error in getAllTransportsAlt:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Get a transport by ID (alternative method).
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getTransportById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const transport: TransportI | null = await Transport.findOne({
                where: { id },
                include: [
                    {
                        model: VehicleType,
                        as: 'vehicleType',
                    },
                ],
            });

            if (transport) {
                res.status(200).json(transport); // Changed to return the object directly
            } else {
                res.status(404).json({ msg: "The transport does not exist" });
            }
        } catch (error) {
            console.error('Error in getTransportById:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }
}
