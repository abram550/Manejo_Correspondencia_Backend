import { UserRoutes } from './UserRoutes';
import { EmployeeRoutes } from './EmployeeRoutes';
import { EmployeeTypeRoutes } from './EmployeeTypeRoutes';
import { BranchRoutes } from './BranchRoutes';
import { CorrespondenceRoutes } from './CorrespondenceRoutes';
import { CorrespondenceTypeRoutes } from './CorrespondenceTypeRoutes';
import { CorrespondenceStateRoutes } from './CorrespondenceStateRoutes';
import { CorrespondenceEventsRoutes } from './CorrespondenceEventsRoutes';
import { RouteRoutes } from './RouteRoutes';
import { PaymentRoutes } from './PaymentRoutes';
import { PaymentTypeRoutes } from './PaymentTypeRoutes';

import { RefreshTokenRoutes } from './refresh_token';
import { TransportRoutes } from './TransportRoutes';
import { UserTypeRoutes } from './UserTypeRoutes';
import { UserUserTypeRoutes } from './UserUserTypeRoutes';
import { VehicleTypeRoutes } from './VehicleTypeRoutes';
import { AuthRoutes } from './auth';

/**
 * Class representing all the routes in the application.
 */
export class Routes {
    // Instances of the various route classes
    public userRoutes: UserRoutes = new UserRoutes();
    public employeeRoutes: EmployeeRoutes = new EmployeeRoutes();
    public employeeTypeRoutes: EmployeeTypeRoutes = new EmployeeTypeRoutes();  // Nueva instancia
    public branchRoutes: BranchRoutes = new BranchRoutes();
    public correspondenceTypeRoutes: CorrespondenceTypeRoutes = new CorrespondenceTypeRoutes();
    public correspondenceStateRoutes: CorrespondenceStateRoutes = new CorrespondenceStateRoutes();
    public correspondenceEventsRoutes: CorrespondenceEventsRoutes = new CorrespondenceEventsRoutes();
    public routeRoutes: RouteRoutes = new RouteRoutes();
    public paymentRoutes: PaymentRoutes = new PaymentRoutes();
    public correspondenceRoutes: CorrespondenceRoutes = new CorrespondenceRoutes();
    public paymentTypeRoutes: PaymentTypeRoutes = new PaymentTypeRoutes();  // Nueva instancia
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();  // Nueva instancia
    public transportRoutes: TransportRoutes = new TransportRoutes();  // Nueva instancia
    public userTypeRoutes: UserTypeRoutes = new UserTypeRoutes();  // Nueva instancia
    public userUserTypeRoutes: UserUserTypeRoutes = new UserUserTypeRoutes();  // Nueva instancia
    public vehicleTypeRoutes: VehicleTypeRoutes = new VehicleTypeRoutes();  // Nueva instancia
    public authRoutes: AuthRoutes = new AuthRoutes();  // Nueva instancia
}
