import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Sucursal extends Model {
  public id!: number;
  public nombre!: string;
  public direccion!: string;
  public ciudad!: string;
  public telefono!: string;
}

export interface SucursalI {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

Sucursal.init(
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
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sucursales",
    sequelize: database,
    timestamps: false,
  }
);
