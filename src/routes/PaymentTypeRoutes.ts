import { Request, Response, Application } from "express";
import { PaymentTypeController } from '../controllers/PaymentTypeController';

/**
 * Defines the routes for managing payment types.
 */
export class PaymentTypeRoutes {
    public paymentTypeController: PaymentTypeController = new PaymentTypeController();

    /**
     * Sets up the routes for the application.
     * @param app - The Express application.
     */
    public routes(app: Application): void {
        // Route to get all payment types
        app.route("/payment-types").get(this.paymentTypeController.getAllPaymentTypes);

        // Route to get a single payment type by ID
        app.route("/payment-types/:id").get(this.paymentTypeController.getOnePaymentType);

        // Route to create a new payment type
        app.route("/payment-types").post(this.paymentTypeController.createPaymentType);

        // Route to update a payment type by ID
        app.route("/payment-types/:id").put(this.paymentTypeController.updatePaymentType);

        // Route to delete a payment type by ID
        app.route("/payment-types/:id").delete(this.paymentTypeController.deletePaymentType);
    }
}
