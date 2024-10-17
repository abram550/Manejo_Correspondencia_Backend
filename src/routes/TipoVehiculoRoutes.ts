import { Request, Response, Application, Router } from "express";
import { TipoVehiculoController } from '../controllers/TipoVehiculoController';

export class TipoVehiculoRoutes {
    public tipoVehiculoController: TipoVehiculoController = new TipoVehiculoController();

    public routes(app: Application): void {
        app.route("/tipovehiculos/test").get(this.tipoVehiculoController.test); // Ruta de prueba
        app.route("/tipovehiculos").get(this.tipoVehiculoController.getAllTipoVehiculos); // Obtener todos
        app.route("/tipovehiculos/:id").get(this.tipoVehiculoController.getOneTipoVehiculo); // Obtener uno por ID
        app.route("/tipovehiculos").post(this.tipoVehiculoController.createTipoVehiculo); // Crear nuevo
        app.route("/tipovehiculos/:id").put(this.tipoVehiculoController.updateTipoVehiculo); // Actualizar por ID
        app.route("/tipovehiculos/:id").delete(this.tipoVehiculoController.deleteTipoVehiculo); // Eliminar por ID


        app.route("/tipovehiculoss").get(this.tipoVehiculoController.obtenerTodosTiposVehiculos); // Obtener todos
        app.route("/tipovehiculoss/:id").get(this.tipoVehiculoController.obtenerTipoVehiculoPorId); // Obtener uno por ID
    
    }
}
