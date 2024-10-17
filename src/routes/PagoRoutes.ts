import { Request, Response, Application } from 'express';
import { PagoController } from '../controllers/PagoController';

export class PagoRoutes {
    public pagoController: PagoController = new PagoController();

    public routes(app: Application): void {
        app.route("/pagos").get(this.pagoController.getAllPagos);
        app.route("/pagos/:id").get(this.pagoController.getOnePago);
        app.route("/pagos").post(this.pagoController.createPago);
        app.route("/pagos/:id").put(this.pagoController.updatePago);
        app.route("/pagos/:id").delete(this.pagoController.deletePago);
    }
}
