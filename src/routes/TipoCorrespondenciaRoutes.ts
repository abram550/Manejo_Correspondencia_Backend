import { Request, Response, Application } from 'express';
import { TipoCorrespondenciaController } from '../controllers/TipoCorrespondenciaController';

export class TipoCorrespondenciaRoutes {
    public tipoCorrespondenciaController: TipoCorrespondenciaController = new TipoCorrespondenciaController();

    public routes(app: Application): void {
        app.route("/tipo-correspondencia").get(this.tipoCorrespondenciaController.getAllTipoCorrespondencia);
        app.route("/tipo-correspondencia/:id").get(this.tipoCorrespondenciaController.getOneTipoCorrespondencia);
        app.route("/tipo-correspondencia").post(this.tipoCorrespondenciaController.createTipoCorrespondencia);
        app.route("/tipo-correspondencia/:id").put(this.tipoCorrespondenciaController.updateTipoCorrespondencia);
        app.route("/tipo-correspondencia/:id").delete(this.tipoCorrespondenciaController.deleteTipoCorrespondencia);
    
    
        app.route("/tipo-correspondenciaa").get(this.tipoCorrespondenciaController.obtenerTodosTiposCorrespondencia);
        app.route("/tipo-correspondenciaa/:id").get(this.tipoCorrespondenciaController.obtenerTipoCorrespondenciaPorId);

    
    }
}
