import { Request, Response, Application } from 'express';
import { CorrespondenceTypeController } from '../controllers/CorrespondenceTypeController';

/**
 * Defines the routes for managing correspondence types.
 */
export class CorrespondenceTypeRoutes {
    public correspondenceTypeController: CorrespondenceTypeController = new CorrespondenceTypeController();

    /**
     * Sets up the routes for the application.
     * @param app - The Express application.
     */
    public routes(app: Application): void {
        // Route to get all correspondence types
        app.route("/correspondence-types").get(this.correspondenceTypeController.getAllCorrespondenceTypes);

        // Route to get a single correspondence type by ID
        app.route("/correspondence-types/:id").get(this.correspondenceTypeController.getOneCorrespondenceType);

        // Route to create a new correspondence type
        app.route("/correspondence-types").post(this.correspondenceTypeController.createCorrespondenceType);

        // Route to update a correspondence type by ID
        app.route("/correspondence-types/:id").put(this.correspondenceTypeController.updateCorrespondenceType);

        // Route to delete a correspondence type by ID
        app.route("/correspondence-types/:id").delete(this.correspondenceTypeController.deleteCorrespondenceType);
    }
}
