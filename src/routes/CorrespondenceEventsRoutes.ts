import { Request, Response, Application } from 'express';
import { CorrespondenceEventsController } from '../controllers/CorrespondenceEventsController';

/**
 * Class representing the correspondence events routes.
 */
export class CorrespondenceEventsRoutes {
    // Instance of the CorrespondenceEventsController
    public correspondenceEventsController: CorrespondenceEventsController = new CorrespondenceEventsController();

    /**
     * Defines the correspondence events routes for the application.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all correspondence events
        app.route("/events").get(this.correspondenceEventsController.getAllEvents);
        
        // Route to get a single event by ID
        app.route("/events/:id").get(this.correspondenceEventsController.getOneEvent);
        
        // Route to create a new correspondence event
        app.route("/events").post(this.correspondenceEventsController.createEvent);
        
        // Route to update an existing correspondence event by ID
        app.route("/events/:id").put(this.correspondenceEventsController.updateEvent);
        
        // Route to delete a correspondence event by ID
        app.route("/events/:id").delete(this.correspondenceEventsController.deleteEvent);
    }
}
