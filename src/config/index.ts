import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from '../routes/index';   
import { UsuarioRoutes } from '../routes/UsuarioRoutes'; 
import { EmpleadoRoutes } from '../routes/EmpleadoRoutes'; 
import { SucursalRoutes } from '../routes/SucursalRoutes'; 
import { TipoCorrespondenciaRoutes } from '../routes/TipoCorrespondenciaRoutes'; 
import { EstadoCorrespondenciaRoutes } from '../routes/EstadoCorrespondenciaRoutes'; 
import { RutaRoutes } from '../routes/RutaRoutes'; 
import { PagoRoutes } from '../routes/PagoRoutes'; 
import { CorrespondenciaRoutes } from '../routes/CorrespondenciaRoutes'; 
import { TransporteRoutes } from '../routes/TransporteRoutes'; 
import { EventosCorrespondenciaRoutes } from '../routes/EventosCorrespondenciaRoutes'; // Importa las rutas de EventosCorrespondencia
import { TipoUsuarioRoutes } from '../routes/TipoUsuarioRoutes';
import { TipoPagoRoutes } from '../routes/TipoPagoRoutes';
import { TipoVehiculoRoutes } from '../routes/TipoVehiculoRoutes';
import { TipoEmpleadoRoutes } from '../routes/TipoEmpleadoRoutes';


export class App {
    public routePrv: Routes = new Routes();

    public usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    public empleadoRoutes: EmpleadoRoutes = new EmpleadoRoutes(); 
    public sucursalRoutes: SucursalRoutes = new SucursalRoutes(); 
    public tipoCorrespondenciaRoutes: TipoCorrespondenciaRoutes = new TipoCorrespondenciaRoutes();
    public estadoCorrespondenciaRoutes: EstadoCorrespondenciaRoutes = new EstadoCorrespondenciaRoutes();
    public rutaRoutes: RutaRoutes = new RutaRoutes();
    public pagoRoutes: PagoRoutes = new PagoRoutes();
    public correspondenciaRoutes: CorrespondenciaRoutes = new CorrespondenciaRoutes();
    public transporteRoutes: TransporteRoutes = new TransporteRoutes();
    public eventosCorrespondenciaRoutes: EventosCorrespondenciaRoutes = new EventosCorrespondenciaRoutes(); // Instancia de EventosCorrespondenciaRoutes
    

    
    public tipoempleadoroutes: TipoEmpleadoRoutes = new TipoEmpleadoRoutes();

    public tipoUsuarioroutes: TipoUsuarioRoutes = new TipoUsuarioRoutes();
    public tipopagoroutes: TipoPagoRoutes = new TipoPagoRoutes();
    public tipovehiculoroutes: TipoVehiculoRoutes = new TipoVehiculoRoutes();

    public app: Application;  // Cambiado a public para acceder fuera de la clase

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    // Configuración del puerto
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    // Configuración de middlewares
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        
        // Habilitar CORS para permitir solicitudes desde otros orígenes
        this.app.use(cors());
    }

    // Configuración de rutas
    private routes() {
        this.usuarioRoutes.routes(this.app);
        this.empleadoRoutes.routes(this.app);
        this.sucursalRoutes.routes(this.app);
        this.tipoCorrespondenciaRoutes.routes(this.app);
        this.estadoCorrespondenciaRoutes.routes(this.app);
        this.rutaRoutes.routes(this.app);
        this.pagoRoutes.routes(this.app);
        this.correspondenciaRoutes.routes(this.app);
        this.transporteRoutes.routes(this.app);
        this.eventosCorrespondenciaRoutes.routes(this.app); // Agrega las rutas de EventosCorrespondencia
        this.tipoUsuarioroutes.routes(this.app);
        this.tipopagoroutes.routes(this.app);
        this.tipovehiculoroutes.routes(this.app);
        this.tipoempleadoroutes.routes(this.app);

    }

    // Escuchar en el puerto configurado
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
