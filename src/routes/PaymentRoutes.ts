import { Request, Response, Application } from 'express';
import { PaymentController } from '../controllers/PaymentController';

/**
 * Class representing the payment routes.
 */
export class PaymentRoutes {
    // Instance of the PaymentController
    public paymentController: PaymentController = new PaymentController();

    /**
     * Defines the payment routes for the application.
     * @param app - The Express application instance.
     */
    public routes(app: Application): void {
        // Route to get all payments
        app.route("/payments").get(this.paymentController.getAllPayments);
        
        // Route to get a single payment by ID
        app.route("/payments/:id").get(this.paymentController.getOnePayment);
        
        // Route to create a new payment
        app.route("/payments").post(this.paymentController.createPayment);
        
        // Route to update an existing payment by ID
        app.route("/payments/:id").put(this.paymentController.updatePayment);
        
        // Route to delete a payment by ID
        app.route("/payments/:id").delete(this.paymentController.deletePayment);
    }
}
