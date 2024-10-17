import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoCorrespondencia extends Model {
  public id!: number;  // Agregar la propiedad id
  public tipo!: string;
}

export interface TipoCorrespondenciaI {
  id: number; // Incluir el id en la interfaz
  tipo: string;
}

TipoCorrespondencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tipo_correspondencia",
    sequelize: database,
    timestamps: false,
  }
);
