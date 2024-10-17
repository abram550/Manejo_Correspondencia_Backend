import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { TipoEmpleado } from "./TipoEmpleado"; 

export class Empleado extends Model {
  public id!: number;  // Agregar la propiedad id
  public nombre!: string;
  public correo!: string;
  public telefono!: string;
  public tipoEmpleadoId!: ForeignKey<TipoEmpleado['id']>;
}

export interface EmpleadoI {
  id: number; // Incluir el id en la interfaz
  nombre: string;
  correo: string;
  telefono: string;
  tipoEmpleadoId: number;
}

Empleado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoEmpleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoEmpleado,
        key: "id",
      },
    },
  },
  {
    tableName: "empleados",
    sequelize: database,
    timestamps: false,
  }
);

// Relaciones
Empleado.belongsTo(TipoEmpleado, {
  foreignKey: "tipoEmpleadoId",
  as: "tipoEmpleado",
});
TipoEmpleado.hasMany(Empleado, {
  foreignKey: "tipoEmpleadoId",
});
