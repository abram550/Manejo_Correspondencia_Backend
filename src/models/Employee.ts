import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { EmployeeType } from "./EmployeeType";

// This class represents the 'Employee' model.
// It stores information about employees, including their type.
export class Employee extends Model {
  public id!: number;  // Unique identifier for the employee
  public name!: string;  // Employee's name
  public email!: string;  // Employee's email
  public phone!: string;  // Employee's phone number
  public employeeTypeId!: ForeignKey<EmployeeType['id']>;  // Foreign key to EmployeeType
  public status!: boolean;  // Field to manage soft deletes. False means the record is "deleted".
}

// Interface to define the shape of an Employee object in TypeScript
export interface EmployeeI {
  id: number;
  name: string;
  email: string;
  phone: string;
  employeeTypeId: number;
  status: boolean;
}

// Model initialization and configuration
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key field
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Name is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Email must be unique
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,  // Phone is required
    },
    employeeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EmployeeType,  // Foreign key reference to EmployeeType
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // Default value for status is true (active)
    },
  },
  {
    tableName: "employees",
    sequelize: database,  // Connection to the database
    timestamps: false,  // Disable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Define relationships
Employee.belongsTo(EmployeeType, {
  foreignKey: "employeeTypeId",
  as: "employeeType",
});

EmployeeType.hasMany(Employee, {
  foreignKey: "employeeTypeId",
});
