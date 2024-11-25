import { Request, Response, Application } from "express";
import { UserController } from '../controllers/UserController';

/**
 * Class representing user routes.
 */
export class UserRoutes {
    public userController: UserController = new UserController();

    /**
     * Define all user-related routes.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all users
        app.route("/users").get(this.userController.getAllUsers);

        // Route to get a specific user by ID
        app.route("/users/:id").get(this.userController.getOneUser);

        // Route to create a new user
        app.route("/users").post(this.userController.createUser);

        // Route to update an existing user by ID
        app.route("/users/:id").put(this.userController.updateUser);

        // Route to delete a user by ID
        app.route("/users/:id").delete(this.userController.deleteUser);

        // Alternative route to get all users (redirects to getAllUsers)
        app.route("/userss").get(this.userController.getAllUsers);

        // Alternative route to get a user by ID (redirects to getOneUser)
        app.route("/userss/:id").get(this.userController.getOneUser);
    }
}
