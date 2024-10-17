import { Request, Response, Application, Router } from "express";
import { EventosCorrespondenciaController } from '../controllers/EventosCorrespondenciaController';

export class EventosCorrespondenciaRoutes {
    public eventosCorrespondenciaController: EventosCorrespondenciaController = new EventosCorrespondenciaController();

    public routes(app: Application): void {
        app.route("/eventos").get(this.eventosCorrespondenciaController.getAllEventos);
        app.route("/eventos/:id").get(this.eventosCorrespondenciaController.getOneEvento);
        app.route("/eventos").post(this.eventosCorrespondenciaController.createEvento);
        app.route("/eventos/:id").put(this.eventosCorrespondenciaController.updateEvento);
        app.route("/eventos/:id").delete(this.eventosCorrespondenciaController.deleteEvento);
    }
}
