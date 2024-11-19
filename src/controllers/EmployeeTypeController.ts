import { Request, Response } from 'express';
import { EmployeeType, EmployeeTypeI } from '../models/EmployeeType';

/**
 * Controller for managing employee types.
 */
export class EmployeeTypeController {
    /**
     * Test method to check if the controller is working.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for EmployeeType');
        } catch (error) {
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get all employee types from the database.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllEmployeeTypes(req: Request, res: Response): Promise<void> {
        try {
            const employeeTypes: EmployeeTypeI[] = await EmployeeType.findAll();
            res.status(200).json({ employeeTypes });
        } catch (error) {
            console.error('Error in getAllEmployeeTypes:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get a single employee type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneEmployeeType(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const employeeType: EmployeeTypeI | null = await EmployeeType.findOne({ where: { id: parseInt(idParam) } });

            if (employeeType) {
                res.status(200).json({ employeeType });
            } else {
                res.status(404).json({ msg: "Employee type does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneEmployeeType:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Create a new employee type.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async createEmployeeType(req: Request, res: Response): Promise<void> {
        const { position } = req.body;

        try {
            const employeeType: EmployeeTypeI = await EmployeeType.create({ position });
            res.status(201).json({ employeeType });
        } catch (error) {
            console.error('Error creating employee type:', error);
            res.status(500).json({ msg: "Error creating employee type" });
        }
    }

    /**
     * Update an employee type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async updateEmployeeType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { position } = req.body;

        try {
            const existingEmployeeType: EmployeeTypeI | null = await EmployeeType.findByPk(pk);

            if (!existingEmployeeType) {
                res.status(404).json({ msg: "Employee type does not exist" });
            } else {
                await EmployeeType.update({ position }, { where: { id: pk } });
                const employeeType: EmployeeTypeI | null = await EmployeeType.findByPk(pk);
                res.status(200).json({ employeeType });
            }
        } catch (error) {
            console.error('Error updating employee type:', error);
            res.status(500).json({ msg: "Error updating employee type" });
        }
    }

    /**
     * Delete an employee type by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async deleteEmployeeType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const existingEmployeeType: EmployeeTypeI | null = await EmployeeType.findByPk(pk);
            if (!existingEmployeeType) {
                res.status(404).json({ msg: "Employee type does not exist" });
            } else {
                await EmployeeType.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Employee type deleted" });
            }
        } catch (error) {
            console.error('Error deleting employee type:', error);
            res.status(500).json({ msg: "Error deleting employee type" });
        }
    }

    /**
     * Get all employee types from the database, returning an array directly.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllEmployeeTypesDirect(req: Request, res: Response): Promise<void> {
        try {
            const employeeTypes: EmployeeTypeI[] = await EmployeeType.findAll();
            res.status(200).json(employeeTypes); // Changed to return an array directly
        } catch (error) {
            console.error('Error in getAllEmployeeTypesDirect:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Get a single employee type by ID, returning the object directly.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getEmployeeTypeById(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const employeeType: EmployeeTypeI | null = await EmployeeType.findOne({ where: { id: parseInt(idParam) } });

            if (employeeType) {
                res.status(200).json(employeeType); // Changed to return the object directly
            } else {
                res.status(404).json({ msg: "Employee type does not exist" });
            }
        } catch (error) {
            console.error('Error in getEmployeeTypeById:', error);
            res.status(500).json({ msg: "Internal error" });
        }
    }
}
