import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { Branch } from "./Branch";  // Import the Branch model

// Route class that defines a route between two branches
export class Route extends Model {
  public originBranchId!: ForeignKey<Branch['id']>;  // ForeignKey for the origin branch
  public destinationBranchId!: ForeignKey<Branch['id']>;  // ForeignKey for the destination branch
  public distanceKm!: number;  // Distance in kilometers between branches
  public estimatedTimeHours!: number;  // Estimated time to travel the route in hours
  public status!: boolean;  // Status field for soft delete functionality
}

export interface RouteI {
  originBranchId: number;
  destinationBranchId: number;
  distanceKm: number;
  estimatedTimeHours: number;
  status: boolean;
}

// Initialize the Route model
Route.init(
  {
    originBranchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Branch,  // Reference to Branch model
        key: "id",
      },
    },
    destinationBranchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Branch,  // Reference to Branch model
        key: "id",
      },
    },
    distanceKm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estimatedTimeHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // True means the record is active
    },
  },
  {
    tableName: "routes",
    sequelize: database,
    timestamps: false,  // No timestamps needed
  }
);

// Define relationships between Route and Branch models
Route.belongsTo(Branch, { foreignKey: "originBranchId", as: "originBranch" });
Route.belongsTo(Branch, { foreignKey: "destinationBranchId", as: "destinationBranch" });
Branch.hasMany(Route, { foreignKey: "originBranchId", as: "routesFromOrigin" });
Branch.hasMany(Route, { foreignKey: "destinationBranchId", as: "routesToDestination" });
