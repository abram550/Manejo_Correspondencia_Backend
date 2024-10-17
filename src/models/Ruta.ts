import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { Sucursal } from "./Sucursal"; // Importar el modelo Sucursal

export class Ruta extends Model {
  public sucursalOrigenId!: ForeignKey<Sucursal['id']>;
  public sucursalDestinoId!: ForeignKey<Sucursal['id']>;
  public distanciaKm!: number;
  public tiempoEstimadoHoras!: number;
}

export interface RutaI {
  sucursalOrigenId: number;
  sucursalDestinoId: number;
  distanciaKm: number;
  tiempoEstimadoHoras: number;
}

Ruta.init(
  {
    sucursalOrigenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sucursal, // Referencia al modelo Sucursal
        key: "id",
      },
    },
    sucursalDestinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sucursal, // Referencia al modelo Sucursal
        key: "id",
      },
    },
    distanciaKm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tiempoEstimadoHoras: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "rutas",
    sequelize: database,
    timestamps: false,
  }
);

// Establecer las relaciones
Ruta.belongsTo(Sucursal, {
  foreignKey: "sucursalOrigenId",
  as: "sucursalOrigen",
});
Ruta.belongsTo(Sucursal, {
  foreignKey: "sucursalDestinoId",
  as: "sucursalDestino",
});
Sucursal.hasMany(Ruta, {
  foreignKey: "sucursalOrigenId",
  as: "rutasOrigen",
});
Sucursal.hasMany(Ruta, {
  foreignKey: "sucursalDestinoId",
  as: "rutasDestino",
});
