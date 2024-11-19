import { Request, Response, Application } from "express";
import { EmployeeTypeController } from '../controllers/EmployeeTypeController';

/**
 * Defines the routes for managing employee types.
 */
export class EmployeeTypeRoutes {
    public employeeTypeController: EmployeeTypeController = new EmployeeTypeController();

    /**
     * Sets up the routes for the application.
     * @param app - The Express application.
     */
    public routes(app: Application): void {
        // Route for testing
        app.route("/employee-types/test").get(this.employeeTypeController.test);

        // Route to get all employee types
        app.route("/employee-types").get(this.employeeTypeController.getAllEmployeeTypes);

        // Route to get a single employee type by ID
        app.route("/employee-types/:id").get(this.employeeTypeController.getOneEmployeeType);

        // Route to create a new employee type
        app.route("/employee-types").post(this.employeeTypeController.createEmployeeType);

        // Route to update an employee type by ID
        app.route("/employee-types/:id").put(this.employeeTypeController.updateEmployeeType);

        // Route to delete an employee type by ID
        app.route("/employee-types/:id").delete(this.employeeTypeController.deleteEmployeeType);
    }
}
