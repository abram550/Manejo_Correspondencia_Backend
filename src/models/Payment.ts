import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { PaymentType } from "./PaymentType";  // Import the PaymentType model
import { Correspondence } from "./Correspondence";  // Import the Correspondence model

// Payment class to store payment details for correspondence
export class Payment extends Model {
  public id!: number;  // Primary key
  public correspondenceId!: ForeignKey<Correspondence['id']>;  // ForeignKey to correspondence
  public amount!: number;  // Payment amount
  public paymentTypeId!: ForeignKey<PaymentType['id']>;  // ForeignKey to payment type
  public paymentDate!: Date;  // Payment date
  public status!: boolean;  // Status field for soft delete functionality
}

export interface PaymentI {
  id?: number;
  correspondenceId: number;
  amount: number;
  paymentDate: Date;
  paymentTypeId: number;
  status: boolean;
}

// Initialize the Payment model
Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    correspondenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Correspondence,  // Reference to Correspondence model
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentType,  // Reference to PaymentType model
        key: "id",
      },
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // True means the record is active
    },
  },
  {
    tableName: "payments",
    sequelize: database,
    timestamps: false,  // No timestamps needed
  }
);

// Define relationships between Payment, Correspondence, and PaymentType models
Payment.belongsTo(Correspondence, { foreignKey: "correspondenceId", as: "correspondence" });
Payment.belongsTo(PaymentType, { foreignKey: "paymentTypeId", as: "paymentType" });
Correspondence.hasMany(Payment, { foreignKey: "correspondenceId", as: "payments" });
