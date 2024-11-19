import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { UserType } from "./UserType"; // Import the UserType model

export class Permission extends Model {
  public id!: number;
  public name!: string;
  public userTypeId!: number; // Foreign key for UserType
}

export interface PermissionI {
  id?: number;
  name: string;
  userTypeId: number;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_types", // Name of the related table
        key: "id", // Key in the UserType table
      },
    },
  },
  {
    tableName: "permissions",
    sequelize: database,
    timestamps: false,
  }
);
