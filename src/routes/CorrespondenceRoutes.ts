import { Request, Response, Application } from 'express';
import { CorrespondenceController } from '../controllers/CorrespondenceController';

/**
 * Class representing the correspondence routes.
 */
export class CorrespondenceRoutes {
    // Instance of the CorrespondenceController
    public correspondenceController: CorrespondenceController = new CorrespondenceController();

    /**
     * Defines the correspondence routes for the application.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all correspondence
        app.route("/correspondence").get(this.correspondenceController.getAllCorrespondence);
        
        // Route to get a single correspondence by ID
        app.route("/correspondence/:id").get(this.correspondenceController.getOneCorrespondence);
        
        // Route to create new correspondence
        app.route("/correspondence").post(this.correspondenceController.createCorrespondence);
        
        // Route to update an existing correspondence by ID
        app.route("/correspondence/:id").put(this.correspondenceController.updateCorrespondence);
        
        // Route to delete correspondence by ID
        app.route("/correspondence/:id").delete(this.correspondenceController.deleteCorrespondence);
    }
}
