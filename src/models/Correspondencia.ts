import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { Usuario } from "./Usuario"; // Importar el modelo Usuario
import { Empleado } from "./Empleado"; // Importar el modelo Empleado
import { TipoCorrespondencia } from "./TipoCorrespondencia"; // Importar TipoCorrespondencia
import { EstadoCorrespondencia } from "./EstadoCorrespondencia"; // Importar EstadoCorrespondencia
import { Sucursal } from "./Sucursal"; // Importar el modelo Sucursal
import { Transporte } from "./Transporte"; // Importar el modelo Transporte

export class Correspondencia extends Model {
  public id!: number;  // Agregar propiedad id
  public remitenteId!: ForeignKey<Usuario['id']>;
  public destinatarioId!: ForeignKey<Usuario['id']>;
  public empleadoId!: ForeignKey<Empleado['id']>;
  public tipoCorrespondenciaId!: ForeignKey<TipoCorrespondencia['id']>;
  public estadoCorrespondenciaId!: ForeignKey<EstadoCorrespondencia['id']>;
  public sucursalOrigenId!: ForeignKey<Sucursal['id']>;
  public sucursalDestinoId!: ForeignKey<Sucursal['id']>;
  public transporteId!: ForeignKey<Transporte['id']>;
  public fechaEnvio!: Date;
  public fechaEntrega!: Date | null;
  public descripcion!: string;
}

export interface CorrespondenciaI {
  id: number;  // Agregar propiedad id
  remitenteId: number;
  destinatarioId: number;
  empleadoId: number;
  tipoCorrespondenciaId: number;
  estadoCorrespondenciaId: number;
  sucursalOrigenId: number;
  sucursalDestinoId: number;
  transporteId: number;
  fechaEnvio: Date;
  fechaEntrega: Date | null;
  descripcion: string;
}

Correspondencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Agregar clave primaria
    },
    remitenteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario, // Relación con el modelo Usuario (Remitente)
        key: "id",
      },
    },
    destinatarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario, // Relación con el modelo Usuario (Destinatario)
        key: "id",
      },
    },
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado, // Relación con el modelo Empleado
        key: "id",
      },
    },
    tipoCorrespondenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoCorrespondencia, // Relación con el modelo TipoCorrespondencia
        key: "id",
      },
    },
    estadoCorrespondenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EstadoCorrespondencia, // Relación con EstadoCorrespondencia
        key: "id",
      },
    },
    sucursalOrigenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sucursal, // Relación con el modelo Sucursal (Origen)
        key: "id",
      },
    },
    sucursalDestinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sucursal, // Relación con el modelo Sucursal (Destino)
        key: "id",
      },
    },
    transporteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transporte, // Relación con el modelo Transporte
        key: "id",
      },
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaEntrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "correspondencia",
    sequelize: database,
    timestamps: false,
  }
);

// Declarar las relaciones
Correspondencia.belongsTo(Usuario, { foreignKey: "remitenteId", as: "remitente" });
Correspondencia.belongsTo(Usuario, { foreignKey: "destinatarioId", as: "destinatario" });
Correspondencia.belongsTo(Empleado, { foreignKey: "empleadoId", as: "empleado" });
Correspondencia.belongsTo(TipoCorrespondencia, { foreignKey: "tipoCorrespondenciaId", as: "tipoCorrespondencia" });
Correspondencia.belongsTo(EstadoCorrespondencia, { foreignKey: "estadoCorrespondenciaId", as: "estadoCorrespondencia" });
Correspondencia.belongsTo(Sucursal, { foreignKey: "sucursalOrigenId", as: "sucursalOrigen" });
Correspondencia.belongsTo(Sucursal, { foreignKey: "sucursalDestinoId", as: "sucursalDestino" });
Correspondencia.belongsTo(Transporte, { foreignKey: "transporteId", as: "transporte" });
