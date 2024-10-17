import { Request, Response, Application } from 'express';
import { CorrespondenciaController } from '../controllers/CorrespondenciaController';

export class CorrespondenciaRoutes {
    public correspondenciaController: CorrespondenciaController = new CorrespondenciaController();

    public routes(app: Application): void {
        app.route("/correspondencia").get(this.correspondenciaController.getAllCorrespondencia);
        app.route("/correspondencia/:id").get(this.correspondenciaController.getOneCorrespondencia);
        app.route("/correspondencia").post(this.correspondenciaController.createCorrespondencia);
        app.route("/correspondencia/:id").put(this.correspondenciaController.updateCorrespondencia);
        app.route("/correspondencia/:id").delete(this.correspondenciaController.deleteCorrespondencia);
    }
}
