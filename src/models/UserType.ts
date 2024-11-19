import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Permission } from "./Permission"; // Import the Permission model

// User Type model representing user categories
export class UserType extends Model {
  public id!: number;
  public description!: string;
  public status!: boolean; // Status to handle soft deletion
}

// Interface for TypeScript types
export interface UserTypeI {
  id: number;
  description: string;
  status: boolean; // New status field for soft deletion
}

UserType.init(
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
    tableName: "user_types", // Define table name in English
    sequelize: database,
    timestamps: false,
  }
);

// Establish the relationship with the Permission model
UserType.hasMany(Permission, {
  foreignKey: "userTypeId", // Foreign key in the Permission table
  as: "permissions", // Alias for the relationship
});
Permission.belongsTo(UserType, {
  foreignKey: "userTypeId", // Foreign key in the Permission table
  as: "userType", // Alias for the relationship
});
