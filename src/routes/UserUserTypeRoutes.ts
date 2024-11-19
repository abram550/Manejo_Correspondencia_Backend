import { Application } from "express";
import { UserUserTypeController } from "../controllers/UserUserTypeController";

export class UserUserTypeRoutes {
  public userUserTypeController: UserUserTypeController = new UserUserTypeController();

  public routes(app: Application): void {
    // Ruta para obtener todas las relaciones entre usuario y tipo de usuario
    app.route("/userUserTypes").get(this.userUserTypeController.getAll);

    // Ruta para crear una nueva relación
    app.route("/userUserTypes").post(this.userUserTypeController.create);

    // Ruta para actualizar una relación existente
    app.route("/userUserTypes/:id").put(this.userUserTypeController.update);

    // Ruta para eliminar una relación
    app.route("/userUserTypes/:id").delete(this.userUserTypeController.delete);
  }
}
