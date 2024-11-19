import { Request, Response, Application } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';

/**
 * Class representing the employee routes.
 */
export class EmployeeRoutes {
    // Instance of the EmployeeController
    public employeeController: EmployeeController = new EmployeeController();

    /**
     * Defines the employee routes for the application.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all employees
        app.route("/employees").get(this.employeeController.getAllEmployees);
        
        // Route to get a single employee by ID
        app.route("/employees/:id").get(this.employeeController.getOneEmployee);
        
        // Route to create a new employee
        app.route("/employees").post(this.employeeController.createEmployee);
        
        // Route to update an existing employee by ID
        app.route("/employees/:id").put(this.employeeController.updateEmployee);
        
        // Route to delete an employee by ID
        app.route("/employees/:id").delete(this.employeeController.deleteEmployee);
    }
}
