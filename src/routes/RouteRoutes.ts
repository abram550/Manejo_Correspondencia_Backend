import { Request, Response, Application } from 'express';
import { RouteController } from '../controllers/RouteController';

/**
 * Defines the routes for managing routes.
 */
export class RouteRoutes {
    public routeController: RouteController = new RouteController();

    /**
     * Sets up the routes for the application.
     * @param app - The Express application.
     */
    public routes(app: Application): void {
        // Route to get all routes
        app.route("/routes").get(this.routeController.getAllRoutes);

        // Route to get a single route by ID
        app.route("/routes/:id").get(this.routeController.getOneRoute);

        // Route to create a new route
        app.route("/routes").post(this.routeController.createRoute);

        // Route to update a route by ID
        app.route("/routes/:id").put(this.routeController.updateRoute);

        // Route to delete a route by ID
        app.route("/routes/:id").delete(this.routeController.deleteRoute);
    }
}
