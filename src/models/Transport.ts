import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { VehicleType } from "./VehicleType";

// Transport model representing vehicles
export class Transport extends Model {
  public id!: number;
  public plate!: string;
  public capacityKg!: number;
  public vehicleTypeId!: ForeignKey<VehicleType['id']>;
  public status!: boolean; // Status to handle soft deletion
}

// Interface for TypeScript types
export interface TransportI {
  id: number;
  plate: string;
  capacityKg: number;
  vehicleTypeId: number;
  status: boolean; // New status field for soft deletion
}

Transport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    capacityKg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: VehicleType,
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to true for active vehicles
    },
  },
  {
    tableName: "transports", // Define table name in English
    sequelize: database,
    timestamps: false,
  }
);

// Associations
Transport.belongsTo(VehicleType, {
  foreignKey: "vehicleTypeId",
  as: "vehicleType",
});
VehicleType.hasMany(Transport, {
  foreignKey: "vehicleTypeId",
});
