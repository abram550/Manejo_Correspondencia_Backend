import { UsuarioRoutes } from './UsuarioRoutes';
import { EmpleadoRoutes } from './EmpleadoRoutes';
import { SucursalRoutes } from './SucursalRoutes';
import { TipoCorrespondenciaRoutes } from './TipoCorrespondenciaRoutes';
import { EstadoCorrespondenciaRoutes } from './EstadoCorrespondenciaRoutes';
import { RutaRoutes } from './RutaRoutes';
import { PagoRoutes } from './PagoRoutes';
import { CorrespondenciaRoutes } from './CorrespondenciaRoutes';

export class Routes {
    public usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    public empleadoRoutes: EmpleadoRoutes = new EmpleadoRoutes(); 
    public sucursalRoutes: SucursalRoutes = new SucursalRoutes(); 
    public tipoCorrespondenciaRoutes: TipoCorrespondenciaRoutes = new TipoCorrespondenciaRoutes();
    public estadoCorrespondenciaRoutes: EstadoCorrespondenciaRoutes = new EstadoCorrespondenciaRoutes();
    public rutaRoutes: RutaRoutes = new RutaRoutes();
    public pagoRoutes: PagoRoutes = new PagoRoutes();
    public correspondenciaRoutes: CorrespondenciaRoutes = new CorrespondenciaRoutes();
}
