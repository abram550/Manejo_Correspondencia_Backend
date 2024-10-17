import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { TipoVehiculo } from "./TipoVehiculo"; 

export class Transporte extends Model {
  public id!: number;  // Agregar la propiedad id
  public placa!: string;
  public capacidadKg!: number;
  public tipoVehiculoId!: ForeignKey<TipoVehiculo['id']>;
}

export interface TransporteI {
  id: number; // Incluir el id en la interfaz
  placa: string;
  capacidadKg: number;
  tipoVehiculoId: number;
}

Transporte.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    capacidadKg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoVehiculoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoVehiculo,
        key: "id",
      },
    },
  },
  {
    tableName: "transporte",
    sequelize: database,
    timestamps: false,
  }
);

// Relaciones
Transporte.belongsTo(TipoVehiculo, {
  foreignKey: "tipoVehiculoId",
  as: "tipoVehiculo",
});
TipoVehiculo.hasMany(Transporte, {
  foreignKey: "tipoVehiculoId",
});
