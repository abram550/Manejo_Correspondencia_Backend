import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoEmpleado extends Model {
  public id!: number;
  public puesto!: string;
}

export interface TipoEmpleadoI {
  id: number;
  puesto: string;
}

TipoEmpleado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tipoempleados",
    sequelize: database,
    timestamps: false,
  }
);
