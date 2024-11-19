import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

// This class represents the 'EstadoCorrespondencia' (Correspondence State) model.
// It contains the status of correspondence (e.g., delivered, pending, etc.).
export class CorrespondenceState extends Model {
  public id!: number;  // Unique identifier for the correspondence state
  public state!: string;  // Name or description of the state
  public status!: boolean;  // Field to manage soft deletes. False means the record is "deleted".
}

// Interface to define the shape of a CorrespondenceState object in TypeScript
export interface CorrespondenceStateI {
  id: number;
  state: string;
  status: boolean;
}

// Model initialization and configuration
CorrespondenceState.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key field
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,  // State is required
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // Default value for status is true (active)
    },
  },
  {
    tableName: "correspondence_state",
    sequelize: database,  // Connection to the database
    timestamps: false,  // Disable automatic timestamp fields (createdAt, updatedAt)
  }
);
