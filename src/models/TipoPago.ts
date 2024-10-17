import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoPago extends Model {
  public id!: number;  // Agregar propiedad id
  public nombre!: string;
}
export interface TipoPagoI {
  id: number;
  nombre: string;
}


TipoPago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Agregar clave primaria
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tipopagos",
    sequelize: database,
    timestamps: false,
  }
);
