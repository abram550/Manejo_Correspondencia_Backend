import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";
import { Employee } from "./Employee";
import { CorrespondenceType } from "./CorrespondenceType";
import { CorrespondenceState } from "./CorrespondenceState";
import { Branch } from "./Branch";
import { Transport } from "./Transport";

// This class represents the 'Correspondence' model.
// It stores information about correspondence and its associated entities.
export class Correspondence extends Model {
  public id!: number;  // Unique identifier for the correspondence
  public senderId!: ForeignKey<User['id']>;  // Foreign key to the sender (User)
  public recipientId!: ForeignKey<User['id']>;  // Foreign key to the recipient (User)
  public employeeId!: ForeignKey<Employee['id']>;  // Foreign key to the employee responsible
  public correspondenceTypeId!: ForeignKey<CorrespondenceType['id']>;  // Foreign key to the type of correspondence
  public correspondenceStateId!: ForeignKey<CorrespondenceState['id']>;  // Foreign key to the state of the correspondence
  public originBranchId!: ForeignKey<Branch['id']>;  // Foreign key to the origin branch
  public destinationBranchId!: ForeignKey<Branch['id']>;  // Foreign key to the destination branch
  public transportId!: ForeignKey<Transport['id']>;  // Foreign key to the transport used
  public sendDate!: Date;  // Date the correspondence was sent
  public deliveryDate!: Date | null;  // Date the correspondence was delivered, can be null
  public description!: string;  // Description or additional details about the correspondence
  public status!: boolean;  // Field to manage soft deletes. False means the record is "deleted".
}

// Interface to define the shape of a Correspondence object in TypeScript
export interface CorrespondenceI {
  id: number;
  senderId: number;
  recipientId: number;
  employeeId: number;
  correspondenceTypeId: number;
  correspondenceStateId: number;
  originBranchId: number;
  destinationBranchId: number;
  transportId: number;
  sendDate: Date;
  deliveryDate: Date | null;
  description: string;
  status: boolean;
}

// Model initialization and configuration
Correspondence.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Primary key field
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,  // Foreign key reference to User (Sender)
        key: "id",
      },
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,  // Foreign key reference to User (Recipient)
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,  // Foreign key reference to Employee
        key: "id",
      },
    },
    correspondenceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CorrespondenceType,  // Foreign key reference to CorrespondenceType
        key: "id",
      },
    },
    correspondenceStateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CorrespondenceState,  // Foreign key reference to CorrespondenceState
        key: "id",
      },
    },
    originBranchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Branch,  // Foreign key reference to Branch (Origin)
        key: "id",
      },
    },
    destinationBranchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Branch,  // Foreign key reference to Branch (Destination)
        key: "id",
      },
    },
    transportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transport,  // Foreign key reference to Transport
        key: "id",
      },
    },
    sendDate: {
      type: DataTypes.DATE,
      allowNull: false,  // Send date is required
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,  // Delivery date is optional
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,  // Description is required
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // Default value for status is true (active)
    },
  },
  {
    tableName: "correspondence",
    sequelize: database,  // Connection to the database
    timestamps: false,  // Disable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Define relationships
Correspondence.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Correspondence.belongsTo(User, { foreignKey: "recipientId", as: "recipient" });
Correspondence.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });
Correspondence.belongsTo(CorrespondenceType, { foreignKey: "correspondenceTypeId", as: "correspondenceType" });
Correspondence.belongsTo(CorrespondenceState, { foreignKey: "correspondenceStateId", as: "correspondenceState" });
Correspondence.belongsTo(Branch, { foreignKey: "originBranchId", as: "originBranch" });
Correspondence.belongsTo(Branch, { foreignKey: "destinationBranchId", as: "destinationBranch" });
Correspondence.belongsTo(Transport, { foreignKey: "transportId", as: "transport" });
