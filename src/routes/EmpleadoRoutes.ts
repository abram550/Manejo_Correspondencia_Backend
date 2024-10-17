import { Request, Response, Application } from 'express';
import { EmpleadoController } from '../controllers/EmpleadoController';

export class EmpleadoRoutes {
    public empleadoController: EmpleadoController = new EmpleadoController();

    public routes(app: Application): void {
        app.route("/empleados").get(this.empleadoController.getAllEmpleados);
        app.route("/empleados/:id").get(this.empleadoController.getOneEmpleado);
        app.route("/empleados").post(this.empleadoController.createEmpleado);
        app.route("/empleados/:id").put(this.empleadoController.updateEmpleado);
        app.route("/empleados/:id").delete(this.empleadoController.deleteEmpleado);
    
        app.route("/empleadoss").get(this.empleadoController.obtenerTodosEmpleados); // Cambiado
        app.route("/empleadoss/:id").get(this.empleadoController.obtenerEmpleadoPorId); // Cambiado

    
    
    
    }
}
