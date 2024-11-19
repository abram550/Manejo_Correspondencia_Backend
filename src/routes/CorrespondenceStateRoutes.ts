import { Request, Response, Application } from 'express';
import { CorrespondenceStateController } from '../controllers/CorrespondenceStateController';

/**
 * Class representing the correspondence state routes.
 */
export class CorrespondenceStateRoutes {
    // Instance of the CorrespondenceStateController
    public stateController: CorrespondenceStateController = new CorrespondenceStateController();

    /**
     * Defines the correspondence state routes for the application.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all correspondence states
        app.route("/states").get(this.stateController.getAllStates);
        
        // Route to get a single state by ID
        app.route("/states/:id").get(this.stateController.getOneState);
        
        // Route to create a new correspondence state
        app.route("/states").post(this.stateController.createState);
        
        // Route to update an existing correspondence state by ID
        app.route("/states/:id").put(this.stateController.updateState);
        
        // Route to delete a correspondence state by ID
        app.route("/states/:id").delete(this.stateController.deleteState);
    }
}
