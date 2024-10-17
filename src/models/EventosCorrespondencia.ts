import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { Correspondencia } from "./Correspondencia"; // Asegúrate de importar el modelo Correspondencia
import { Sucursal } from "./Sucursal"; // Asegúrate de importar el modelo Sucursal
import { Empleado } from "./Empleado"; // Asegúrate de importar el modelo Empleado
import { EstadoCorrespondencia } from "./EstadoCorrespondencia"; // Asegúrate de importar el modelo EstadoCorrespondencia

export class EventosCorrespondencia extends Model {
  public correspondenciaId!: ForeignKey<Correspondencia['id']>;
  public sucursalId!: ForeignKey<Sucursal['id']>;
  public empleadoId!: ForeignKey<Empleado['id']>;
  public estadoCorrespondenciaId!: ForeignKey<EstadoCorrespondencia['id']>;
  public fechaEvento!: Date;
  public descripcion!: string;
}

export interface EventosCorrespondenciaI {
  correspondenciaId: number;
  sucursalId: number;
  empleadoId: number;
  estadoCorrespondenciaId: number;
  fechaEvento: Date;
  descripcion: string;
}

EventosCorrespondencia.init(
  {
    correspondenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'correspondencia', // Nombre de la tabla de referencia
        key: 'id'
      }
    },
    sucursalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sucursales', // Nombre de la tabla de referencia
        key: 'id'
      }
    },
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleados', // Nombre de la tabla de referencia
        key: 'id'
      }
    },
    estadoCorrespondenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado_correspondencia', // Nombre de la tabla de referencia
        key: 'id'
      }
    },
    fechaEvento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "eventos_correspondencia",
    sequelize: database,
    timestamps: false
  }
);
