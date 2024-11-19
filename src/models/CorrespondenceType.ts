import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

/**
 * CorrespondenceType model represents different types of correspondence.
 * The 'status' field is used to manage soft deletes. 
 * When 'status' is false, the record will be hidden but still remain in the database.
 */
export class CorrespondenceType extends Model {
  public id!: number;  // Primary key ID
  public type!: string;  // Type of correspondence
  public status!: boolean;  // Status field for soft delete
}

export interface CorrespondenceTypeI {
  id: number;
  type: string;
  status: boolean;
}

CorrespondenceType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Default status is true (visible)
    },
  },
  {
    tableName: "correspondence_types",
    sequelize: database,
    timestamps: false,  // Disables timestamp columns
  }
);
