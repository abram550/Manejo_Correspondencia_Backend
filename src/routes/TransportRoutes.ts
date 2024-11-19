import { Request, Response, Application } from "express";
import { TransportController } from '../controllers/TransportController';

/**
 * Class representing transport routes.
 */
export class TransportRoutes {
    public transportController: TransportController = new TransportController();

    /**
     * Define all transport-related routes.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all transports
        app.route("/transports").get(this.transportController.getAllTransports);
        
        // Route to get a specific transport by ID
        app.route("/transports/:id").get(this.transportController.getOneTransport);
        
        // Route to create a new transport
        app.route("/transports").post(this.transportController.createTransport);
        
        // Route to update an existing transport by ID
        app.route("/transports/:id").put(this.transportController.updateTransport);
        
        // Route to delete a transport by ID
        app.route("/transports/:id").delete(this.transportController.deleteTransport);

        // Alternative route to get all transports (modified)
        app.route("/transportss").get(this.transportController.getAllTransports); 
        
        // Alternative route to get a transport by ID (modified)
        app.route("/transportss/:id").get(this.transportController.getTransportById); 
    }
}
