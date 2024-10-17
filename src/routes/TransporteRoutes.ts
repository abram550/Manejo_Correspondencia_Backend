import { Request, Response, Application } from "express";
import { TransporteController } from '../controllers/TransporteController';

export class TransporteRoutes {
    public transporteController: TransporteController = new TransporteController();

    public routes(app: Application): void {
        app.route("/transportes").get(this.transporteController.getAllTransporte);
        app.route("/transportes/:id").get(this.transporteController.getOneTransporte);
        app.route("/transportes").post(this.transporteController.createTransporte);
        app.route("/transportes/:id").put(this.transporteController.updateTransporte);
        app.route("/transportes/:id").delete(this.transporteController.deleteTransporte);
    
        app.route("/transportess").get(this.transporteController.obtenerTodosTransportes); // Método modificado
        app.route("/transportess/:id").get(this.transporteController.obtenerTransportePorId); // Método modificado

    
    
    }
}
