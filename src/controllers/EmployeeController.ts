import { Request, Response } from 'express';
import { Employee, EmployeeI } from '../models/Employee';
import { EmployeeType } from '../models/EmployeeType'; // Import the EmployeeType model

/**
 * EmployeeController class that handles requests related to employees.
 */
export class EmployeeController {
    /**
     * Retrieve all employees from the database, including their associated employee types.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllEmployees(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all employees including their employee type
            const employees: EmployeeI[] = await Employee.findAll({
                include: {
                    model: EmployeeType,
                    as: 'employeeType', // Alias of the relationship
                },
            });
            res.status(200).json({ employees });
        } catch (error) {
            console.error('Error in getAllEmployees:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Retrieve a single employee by ID, including their associated employee type.
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getOneEmployee(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            // Find an employee by ID, including their employee type
            const employee: EmployeeI | null = await Employee.findOne({
                where: { id },
                include: {
                    model: EmployeeType,
                    as: 'employeeType', // Alias of the relationship
                },
            });
            if (employee) {
                res.status(200).json({ employee });
            } else {
                res.status(404).json({ msg: "The employee does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneEmployee:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    /**
     * Create a new employee in the database.
     * @param req - The request object containing employee data.
     * @param res - The response object.
     */
    public async createEmployee(req: Request, res: Response): Promise<void> {
        const { name, email, phone, employeeTypeId } = req.body; // Ensure employeeTypeId is included

        try {
            // Create a new employee
            const newEmployee: EmployeeI = await Employee.create({ name, email, phone, employeeTypeId });
            res.status(201).json({ newEmployee });
        } catch (error) {
            console.error('Error in createEmployee:', error);
            res.status(500).json({ msg: "Error creating the employee" });
        }
    }

    /**
     * Update an existing employee by ID.
     * @param req - The request object containing the employee ID and data to update.
     * @param res - The response object.
     */
    public async updateEmployee(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, email, phone, employeeTypeId } = req.body; // Ensure employeeTypeId is included

        try {
            const existingEmployee: EmployeeI | null = await Employee.findByPk(id);
            if (!existingEmployee) {
                res.status(404).json({ msg: "The employee does not exist" });
                return;
            }

            // Update the employee's details
            await Employee.update({ name, email, phone, employeeTypeId }, { where: { id } });
            const updatedEmployee: EmployeeI | null = await Employee.findByPk(id);
            res.status(200).json({ employee: updatedEmployee });
        } catch (error) {
            console.error('Error in updateEmployee:', error);
            res.status(500).json({ msg: "Error updating the employee" });
        }
    }

    /**
     * Delete an employee by ID.
     * @param req - The request object containing the employee ID.
     * @param res - The response object.
     */
    public async deleteEmployee(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingEmployee: EmployeeI | null = await Employee.findByPk(id);
            if (!existingEmployee) {
                res.status(404).json({ msg: "The employee does not exist" });
                return;
            }

            // Delete the employee
            await Employee.destroy({ where: { id } });
            res.status(200).json({ msg: "Employee Deleted" });
        } catch (error) {
            console.error('Error in deleteEmployee:', error);
            res.status(500).json({ msg: "Error deleting the employee" });
        }
    }

    /**
     * Retrieve all employees from the database (alternative method).
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getAllEmployeesAlternative(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all employees including their employee type
            const employees: EmployeeI[] = await Employee.findAll({
                include: {
                    model: EmployeeType,
                    as: 'employeeType', // Alias of the relationship
                },
            });
            
            // Respond with the array directly
            res.status(200).json(employees); // Changed to return the array directly
        } catch (error) {
            console.error('Error in getAllEmployeesAlternative:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }
    
    /**
     * Retrieve an employee by ID (alternative method).
     * @param req - The request object.
     * @param res - The response object.
     */
    public async getEmployeeById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
            // Find an employee by ID, including their employee type
            const employee: EmployeeI | null = await Employee.findOne({
                where: { id },
                include: {
                    model: EmployeeType,
                    as: 'employeeType', // Alias of the relationship
                },
            });
            
            if (employee) {
                // Respond with the object directly
                res.status(200).json(employee); // Changed to return the object directly
            } else {
                res.status(404).json({ msg: "The employee does not exist" });
            }
        } catch (error) {
            console.error('Error in getEmployeeById:', error);
            res.status(500).json({ msg: "Internal Error" });
        }
    }
}
