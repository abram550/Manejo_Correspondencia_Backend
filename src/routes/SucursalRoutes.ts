import { Request, Response, Application } from 'express';
import { SucursalController } from '../controllers/SucursalController';

export class SucursalRoutes {
    public sucursalController: SucursalController = new SucursalController();

    public routes(app: Application): void {
        app.route("/sucursales").get(this.sucursalController.getAllSucursales);
        app.route("/sucursales/:id").get(this.sucursalController.getOneSucursal);
        app.route("/sucursales").post(this.sucursalController.createSucursal);
        app.route("/sucursales/:id").put(this.sucursalController.updateSucursal);
        app.route("/sucursales/:id").delete(this.sucursalController.deleteSucursal);
    
        app.route("/sucursaless").get(this.sucursalController.obtenerTodasSucursales); // Cambiado a nuevo método
        app.route("/sucursaless/:id").get(this.sucursalController.obtenerSucursalPorId); // Cambiado a nuevo método
    
    }



}
