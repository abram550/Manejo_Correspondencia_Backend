import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";

export class RefreshToken extends Model {
  public id!: number;
  public user_id!: number; // Foreign key
  public token!: string;
  public device_info!: string;
  public is_valid!: boolean;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "refresh_tokens",
    sequelize: database,
    timestamps: false,
    hooks: {
      beforeCreate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.created_at = currentDate;
        refreshToken.updated_at = currentDate;
      },
      beforeUpdate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.updated_at = currentDate;
      },
    },
  }
);

// Configurar relaciones
User.hasMany(RefreshToken, {
  foreignKey: "user_id",
  as: "refreshTokens", // Alias para la relación
  onDelete: "RESTRICT",
});

RefreshToken.belongsTo(User, {
  foreignKey: "user_id",
  as: "user", // Alias para la relación
});
