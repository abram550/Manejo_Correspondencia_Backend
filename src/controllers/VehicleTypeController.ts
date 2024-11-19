import { Request, Response } from 'express';
import { VehicleType, VehicleTypeI } from '../models/VehicleType';

export class VehicleTypeController {
    // Test method to verify if the controller is working
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for VehicleType');
        } catch (error) {
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Retrieve all vehicle types
    public async getAllVehicleTypes(req: Request, res: Response): Promise<void> {
        try {
            const vehicleTypes: VehicleTypeI[] = await VehicleType.findAll();
            res.status(200).json({ vehicleTypes });
        } catch (error) {
            console.error('Error in getAllVehicleTypes:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Retrieve a single vehicle type by ID
    public async getOneVehicleType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const vehicleType: VehicleTypeI | null = await VehicleType.findOne({ where: { id } });

            if (vehicleType) {
                res.status(200).json({ vehicleType });
            } else {
                res.status(404).json({ msg: "The Vehicle Type does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneVehicleType:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Create a new vehicle type
    public async createVehicleType(req: Request, res: Response): Promise<void> {
        const { description } = req.body;

        try {
            const vehicleType: VehicleTypeI = await VehicleType.create({ description });
            res.status(201).json({ vehicleType });
        } catch (error) {
            console.error('Error in createVehicleType:', error);
            res.status(500).json({ msg: "Error creating vehicle type" });
        }
    }

    // Update an existing vehicle type
    public async updateVehicleType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { description } = req.body;

        try {
            const existingVehicleType: VehicleTypeI | null = await VehicleType.findByPk(id);

            if (!existingVehicleType) {
                res.status(404).json({ msg: "The Vehicle Type does not exist" });
                return;
            }

            await VehicleType.update({ description }, { where: { id } });
            const updatedVehicleType: VehicleTypeI | null = await VehicleType.findByPk(id);
            res.status(200).json({ vehicleType: updatedVehicleType });
        } catch (error) {
            console.error('Error in updateVehicleType:', error);
            res.status(500).json({ msg: "Error updating vehicle type" });
        }
    }

    // Delete a vehicle type
    public async deleteVehicleType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingVehicleType: VehicleTypeI | null = await VehicleType.findByPk(id);
            if (!existingVehicleType) {
                res.status(404).json({ msg: "The Vehicle Type does not exist" });
                return;
            }

            await VehicleType.destroy({ where: { id } });
            res.status(200).json({ msg: "Vehicle Type Deleted" });
        } catch (error) {
            console.error('Error in deleteVehicleType:', error);
            res.status(500).json({ msg: "Error deleting vehicle type" });
        }
    }
}
