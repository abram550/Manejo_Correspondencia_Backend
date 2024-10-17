import { Request, Response, Application } from "express";
import { TipoUsuarioController } from '../controllers/TipoUsuarioController';

export class TipoUsuarioRoutes {
    public tipoUsuarioController: TipoUsuarioController = new TipoUsuarioController();

    public routes(app: Application): void {
        app.route("/tipousuarios/test").get(this.tipoUsuarioController.test);
        app.route("/tipousuarios").get(this.tipoUsuarioController.getAllTipoUsuarios);
        app.route("/tipousuarios/:id").get(this.tipoUsuarioController.getOneTipoUsuario);
        app.route("/tipousuarios").post(this.tipoUsuarioController.createTipoUsuario);
        app.route("/tipousuarios/:id").put(this.tipoUsuarioController.updateTipoUsuario);
        app.route("/tipousuarios/:id").delete(this.tipoUsuarioController.deleteTipoUsuario);



        app.route("/tipousuarioss").get(this.tipoUsuarioController.obtenerTiposUsuario);
        
        // Ruta para obtener un tipo de usuario por ID
        app.route("/tipousuarioss/:id").get(this.tipoUsuarioController.obtenerTipoUsuarioPorId);
    }
}
