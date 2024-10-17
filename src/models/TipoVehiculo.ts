import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoVehiculo extends Model {
  public id!: number;
  public descripcion!: string;
}

export interface TipoVehiculoI {
  id: number;
  descripcion: string;
}

TipoVehiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tipovehiculos",
    sequelize: database,
    timestamps: false,
  }
);
