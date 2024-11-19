import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class User extends Model {
  public id!: number; // ID of the user
  public name!: string; // User's name
  public address!: string; // User's address
  public email!: string; // User's email
  public phone!: string; // User's phone number
  public status!: boolean; // Status to handle soft deletion
  public password!: string; // User's password
  public avatar!: string; // User's avatar

  // Method to check the password
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Method to generate a JWT token
  public generateToken(): string {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1m", // Token expires in 1 minute
    });
  }

  // Method to generate a refresh token with expiration date
  public generateRefreshToken(): { token: string; expiresAt: Date } {
    const expiresIn = "3m"; // Token expires in 3 minutes
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET || "secret", {
      expiresIn,
    });
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Expires after 3 minutes
    return { token, expiresAt };
  }
}

// Interface for TypeScript types
export interface UserI {
  id?: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  status: boolean; // New status field for soft deletion
  password: string;
  avatar?: string;
}

// Initialize the User model
User.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to true for active users
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users", // Define table name in English
    sequelize: database,
    timestamps: false, // No timestamps
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);
