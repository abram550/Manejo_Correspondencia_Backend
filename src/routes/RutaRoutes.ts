import { Request, Response, Application } from 'express';
import { RutaController } from '../controllers/RutaController';

export class RutaRoutes {
    public rutaController: RutaController = new RutaController();

    public routes(app: Application): void {
        app.route("/rutas").get(this.rutaController.getAllRutas);
        app.route("/rutas/:id").get(this.rutaController.getOneRuta);
        app.route("/rutas").post(this.rutaController.createRuta);
        app.route("/rutas/:id").put(this.rutaController.updateRuta);
        app.route("/rutas/:id").delete(this.rutaController.deleteRuta);
    }
}
