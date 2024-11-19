import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";
import { UserType } from "./UserType";

export class UserUserType extends Model {
  public id!: number; // ID of the relationship
  public userId!: ForeignKey<User["id"]>; // Foreign key for User
  public userTypeId!: ForeignKey<UserType["id"]>; // Foreign key for UserType
  public status!: boolean; // Status to handle soft deletion
}

// Initialize the UserUserType model
UserUserType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_types",
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to true for active records
    },
  },
  {
    tableName: "user_user_types", // Define table name in English
    sequelize: database,
    timestamps: false,
  }
);

// Associations for the intermediate table
UserUserType.belongsTo(User, { foreignKey: "userId", as: "user" });
UserUserType.belongsTo(UserType, { foreignKey: "userTypeId", as: "userType" });
User.hasMany(UserUserType, { foreignKey: "userId", as: "userUserTypes" });
UserType.hasMany(UserUserType, { foreignKey: "userTypeId", as: "userUserTypes" });
