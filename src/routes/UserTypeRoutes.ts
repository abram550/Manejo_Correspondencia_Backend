import { Request, Response, Application } from "express";
import { UserTypeController } from '../controllers/UserTypeController';

/**
 * Class representing user type routes.
 */
export class UserTypeRoutes {
    public userTypeController: UserTypeController = new UserTypeController();

    /**
     * Define all user type-related routes.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Test route for user types
        app.route("/userTypes/test").get(this.userTypeController.test);
        
        // Route to get all user types
        app.route("/userTypes").get(this.userTypeController.getAllUserTypes); 
        
        // Route to get a specific user type by ID
        app.route("/userTypes/:id").get(this.userTypeController.getOneUserType); 
        
        // Route to create a new user type
        app.route("/userTypes").post(this.userTypeController.createUserType); 
        
        // Route to update an existing user type by ID
        app.route("/userTypes/:id").put(this.userTypeController.updateUserType); 
        
        // Route to delete a user type by ID
        app.route("/userTypes/:id").delete(this.userTypeController.deleteUserType); 

       
    }
}
