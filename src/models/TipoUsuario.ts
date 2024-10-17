import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoUsuario extends Model {
  public id!: number;
  public descripcion!: string;
}

export interface TipoUsuarioI {
  id: number;
  descripcion: string;
}

TipoUsuario.init(
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
    tableName: "tipousuarios",
    sequelize: database,
    timestamps: false,
  }
);
