import { Request, Response, Application } from "express";
import { TipoPagoController } from '../controllers/TipoPagoController';

export class TipoPagoRoutes {
    public tipoPagoController: TipoPagoController = new TipoPagoController();

    public routes(app: Application): void {
        app.route("/tipopagos").get(this.tipoPagoController.getAllTipoPago);
        app.route("/tipopagos/:id").get(this.tipoPagoController.getOneTipoPago);
        app.route("/tipopagos").post(this.tipoPagoController.createTipoPago);
        app.route("/tipopagos/:id").put(this.tipoPagoController.updateTipoPago);
        app.route("/tipopagos/:id").delete(this.tipoPagoController.deleteTipoPago);
    
        app.route("/tipopagoss").get(this.tipoPagoController.obtenerTodosTiposPago);
        app.route("/tipopagoss/:id").get(this.tipoPagoController.obtenerTipoPagoPorId);

    
    
    
    }
}
