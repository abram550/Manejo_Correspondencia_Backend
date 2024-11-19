import { Request, Response, Application } from "express";
import { VehicleTypeController } from '../controllers/VehicleTypeController';

/**
 * Class representing vehicle type routes.
 */
export class VehicleTypeRoutes {
    public vehicleTypeController: VehicleTypeController = new VehicleTypeController();

    /**
     * Define all vehicle type-related routes.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Test route for vehicle types
        app.route("/vehicleTypes/test").get(this.vehicleTypeController.test);
        
        // Route to get all vehicle types
        app.route("/vehicleTypes").get(this.vehicleTypeController.getAllVehicleTypes); 
        
        // Route to get a specific vehicle type by ID
        app.route("/vehicleTypes/:id").get(this.vehicleTypeController.getOneVehicleType); 
        
        // Route to create a new vehicle type
        app.route("/vehicleTypes").post(this.vehicleTypeController.createVehicleType); 
        
        // Route to update an existing vehicle type by ID
        app.route("/vehicleTypes/:id").put(this.vehicleTypeController.updateVehicleType); 
        
        // Route to delete a vehicle type by ID
        app.route("/vehicleTypes/:id").delete(this.vehicleTypeController.deleteVehicleType); 


    }
}
