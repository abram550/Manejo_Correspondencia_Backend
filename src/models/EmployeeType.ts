import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

/**
 * EmployeeType model represents different job positions for employees.
 * The 'status' field is used to manage soft deletes. 
 * When 'status' is false, the record will be hidden but still remain in the database.
 */
export class EmployeeType extends Model {
  public id!: number;  // Primary key ID
  public jobTitle!: string;  // Job title for the employee type
  public status!: boolean;  // Status field for soft delete
}

export interface EmployeeTypeI {
  id: number;
  jobTitle: string;
  status: boolean;
}

EmployeeType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Default status is true (visible)
    },
  },
  {
    tableName: "employee_types",
    sequelize: database,
    timestamps: false,  // Disables timestamp columns
  }
);
