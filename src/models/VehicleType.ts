import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

// Vehicle Type model representing types of vehicles
export class VehicleType extends Model {
  public id!: number;
  public description!: string;
  public status!: boolean; // Status to handle soft deletion
}

// Interface for TypeScript types
export interface VehicleTypeI {
  id: number;
  description: string;
  status: boolean; // New status field for soft deletion
}

VehicleType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to true for active records
    },
  },
  {
    tableName: "vehicle_types", // Define table name in English
    sequelize: database,
    timestamps: false,
  }
);
