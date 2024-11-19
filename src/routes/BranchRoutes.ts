import { Request, Response, Application } from 'express';
import { BranchController } from '../controllers/BranchController';

/**
 * Defines the routes for managing branches.
 */
export class BranchRoutes {
    public branchController: BranchController = new BranchController();

    /**
     * Sets up the routes for the application.
     * @param app - The Express application.
     */
    public routes(app: Application): void {
        // Route to get all branches
        app.route("/branches").get(this.branchController.getAllBranches);

        // Route to get a single branch by ID
        app.route("/branches/:id").get(this.branchController.getOneBranch);

        // Route to create a new branch
        app.route("/branches").post(this.branchController.createBranch);

        // Route to update a branch by ID
        app.route("/branches/:id").put(this.branchController.updateBranch);

        // Route to delete a branch by ID
        app.route("/branches/:id").delete(this.branchController.deleteBranch);
    }
}
