import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from '../routes/index';   
import { UserRoutes } from '../routes/UserRoutes'; 
import { EmployeeRoutes } from '../routes/EmployeeRoutes'; 
import { BranchRoutes } from '../routes/BranchRoutes'; 
import { CorrespondenceTypeRoutes } from '../routes/CorrespondenceTypeRoutes'; 
import { CorrespondenceStateRoutes } from '../routes/CorrespondenceStateRoutes'; 
import { RouteRoutes } from '../routes/RouteRoutes'; 
import { PaymentRoutes } from '../routes/PaymentRoutes'; 
import { CorrespondenceRoutes } from '../routes/CorrespondenceRoutes'; 
import { TransportRoutes } from '../routes/TransportRoutes'; 
import { CorrespondenceEventsRoutes } from '../routes/CorrespondenceEventsRoutes'; 
import { UserTypeRoutes } from '../routes/UserTypeRoutes';
import { PaymentTypeRoutes } from '../routes/PaymentTypeRoutes';
import { VehicleTypeRoutes } from '../routes/VehicleTypeRoutes';
import { EmployeeTypeRoutes } from '../routes/EmployeeTypeRoutes';
import { RefreshTokenRoutes } from '../routes/refresh_token';  // Nueva importación
import { UserUserTypeRoutes } from '../routes/UserUserTypeRoutes';  // Nueva importación

/**
 * Class representing the main application.
 */
export class App {
    // Instance of the Routes class
    public routeProvider: Routes = new Routes();

    public app: Application; // Exposed public property for app instance

    /**
     * Creates an instance of the App class.
     * @param port - The port number or string to run the server on.
     */
    constructor(private port?: number | string) {
        this.app = express(); // Create a new Express application
        this.settings(); // Set up application settings
        this.middlewares(); // Set up application middlewares
        this.routes(); // Set up application routes
    }

    // Configure the server port
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000); // Use the provided port or default to 3000
    }

    // Configure middlewares for the application
    private middlewares() {
        this.app.use(morgan('dev')); // Use morgan for logging requests in development mode
        this.app.use(express.json()); // Parse incoming requests with JSON payloads
        this.app.use(express.urlencoded({ extended: false })); // Parse incoming requests with URL-encoded payloads
        
        // Enable CORS to allow requests from different origins
        this.app.use(cors());
    }

    // Configure routes for the application
    private routes() {
        this.routeProvider.userRoutes.routes(this.app); // Set up user routes
        this.routeProvider.employeeRoutes.routes(this.app); // Set up employee routes
        this.routeProvider.branchRoutes.routes(this.app); // Set up branch routes
        this.routeProvider.correspondenceTypeRoutes.routes(this.app); // Set up correspondence type routes
        this.routeProvider.correspondenceStateRoutes.routes(this.app); // Set up correspondence state routes
        this.routeProvider.routeRoutes.routes(this.app); // Set up route routes
        this.routeProvider.paymentRoutes.routes(this.app); // Set up payment routes
        this.routeProvider.correspondenceRoutes.routes(this.app); // Set up correspondence routes
        this.routeProvider.transportRoutes.routes(this.app); // Set up transport routes
        this.routeProvider.correspondenceEventsRoutes.routes(this.app); // Set up correspondence events routes
        this.routeProvider.userTypeRoutes.routes(this.app); // Set up user type routes
        this.routeProvider.paymentTypeRoutes.routes(this.app); // Set up payment type routes
        this.routeProvider.vehicleTypeRoutes.routes(this.app); // Set up vehicle type routes
        this.routeProvider.employeeTypeRoutes.routes(this.app); // Set up employee type routes
        this.routeProvider.refreshTokenRoutes.routes(this.app);  // Set up refresh token routes
        this.routeProvider.userUserTypeRoutes.routes(this.app);  // Set up user-user type routes
    }

    // Start the server and listen on the configured port
    async listen() {
        await this.app.listen(this.app.get('port')); // Start listening on the specified port
        console.log('Server running on port', this.app.get('port')); // Log the running port
    }
}
