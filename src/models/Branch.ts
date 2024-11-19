import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

/**
 * Branch model represents different branches of a company.
 * The 'status' field is used to manage soft deletes. 
 * When 'status' is false, the record will be hidden but still remain in the database.
 */
export class Branch extends Model {
  public id!: number;  // Primary key ID
  public name!: string;  // Branch name
  public address!: string;  // Branch address
  public city!: string;  // City where the branch is located
  public phone!: string;  // Branch phone number
  public status!: boolean;  // Status field for soft delete
}

export interface BranchI {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  status: boolean;
}

Branch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,  // Cannot be null
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Default status is true (visible)
    },
  },
  {
    tableName: "branches",
    sequelize: database,
    timestamps: false,  // Disables timestamp columns
  }
);
