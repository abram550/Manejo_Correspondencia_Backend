import { Request, Response, Application } from "express";
import { TipoEmpleadoController } from '../controllers/TipoEmpleadoController';

export class TipoEmpleadoRoutes {
    public tipoEmpleadoController: TipoEmpleadoController = new TipoEmpleadoController();

    public routes(app: Application): void {
        app.route("/tipoempleados/test").get(this.tipoEmpleadoController.test);
        app.route("/tipoempleados").get(this.tipoEmpleadoController.getAllTipoEmpleados);
        app.route("/tipoempleados/:id").get(this.tipoEmpleadoController.getOneTipoEmpleado);
        app.route("/tipoempleados").post(this.tipoEmpleadoController.createTipoEmpleado);
        app.route("/tipoempleados/:id").put(this.tipoEmpleadoController.updateTipoEmpleado);
        app.route("/tipoempleados/:id").delete(this.tipoEmpleadoController.deleteTipoEmpleado);
   
           // Obtener todos los tipos de empleados
           app.route("/tipoempleadoss").get(this.tipoEmpleadoController.obtenerTodosTiposEmpleados);

           // Obtener un tipo de empleado por ID
           app.route("/tipoempleadoss/:id").get(this.tipoEmpleadoController.obtenerTipoEmpleadoPorId);
   
   
    }

}
