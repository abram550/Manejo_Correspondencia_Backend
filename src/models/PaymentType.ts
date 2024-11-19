import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

/**
 * PaymentType model represents different types of payments in the system.
 * The 'status' field is used to manage soft deletes. 
 * When 'status' is false, the record will be hidden but still remain in the database.
 */
export class PaymentType extends Model {
  public id!: number;  // Primary key ID
  public name!: string;  // Name of the payment type
  public status!: boolean;  // Status field for soft delete
}

export interface PaymentTypeI {
  id: number;
  name: string;
  status: boolean;
}

PaymentType.init(
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Default status is true (visible)
    },
  },
  {
    tableName: "payment_types",
    sequelize: database,
    timestamps: false,  // Disables timestamp columns
  }
);
