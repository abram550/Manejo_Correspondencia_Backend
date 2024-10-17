import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class EstadoCorrespondencia extends Model {
  public id!: number;  // Agregar la propiedad id
  public estado!: string;
}

export interface EstadoCorrespondenciaI {
  id: number; // Incluir el id en la interfaz
  estado: string;
}

EstadoCorrespondencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "estado_correspondencia",
    sequelize: database,
    timestamps: false,
  }
);
