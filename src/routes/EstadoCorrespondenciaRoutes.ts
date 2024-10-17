import { Request, Response, Application } from 'express';
import { EstadoCorrespondenciaController } from '../controllers/EstadoCorrespondenciaController';

export class EstadoCorrespondenciaRoutes {
    public estadoController: EstadoCorrespondenciaController = new EstadoCorrespondenciaController();

    public routes(app: Application): void {
        app.route("/estados").get(this.estadoController.getAllEstados);
        app.route("/estados/:id").get(this.estadoController.getOneEstado);
        app.route("/estados").post(this.estadoController.createEstado);
        app.route("/estados/:id").put(this.estadoController.updateEstado);
        app.route("/estados/:id").delete(this.estadoController.deleteEstado);
    
        app.route("/estadoss").get(this.estadoController.obtenerTodosEstados); // Cambiado el método
        app.route("/estadoss/:id").get(this.estadoController.obtenerEstadoPorId); // Cambiado el método

    
    
    }
}
