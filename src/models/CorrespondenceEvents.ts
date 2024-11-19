import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { Correspondence } from "./Correspondence";  // Import Correspondence model
import { Branch } from "./Branch";  // Import Branch model
import { Employee } from "./Employee";  // Import Employee model
import { CorrespondenceState } from "./CorrespondenceState";  // Import CorrespondenceStatus model

// CorrespondenceEvents class to store events related to correspondence
export class CorrespondenceEvents extends Model {
  public correspondenceId!: ForeignKey<Correspondence['id']>;  // ForeignKey to correspondence
  public branchId!: ForeignKey<Branch['id']>;  // ForeignKey to branch
  public employeeId!: ForeignKey<Employee['id']>;  // ForeignKey to employee
  public correspondencestateId!: ForeignKey<CorrespondenceState['id']>;  // ForeignKey to status
  public eventDate!: Date;  // Date of the event
  public description!: string;  // Event description
  public status!: boolean;  // Status field for soft delete functionality
}

export interface CorrespondenceEventsI {
  correspondenceId: number;
  branchId: number;
  employeeId: number;
  correspondencestateId: number;
  eventDate: Date;
  description: string;
  status: boolean;
}

// Initialize the CorrespondenceEvents model
CorrespondenceEvents.init(
  {
    correspondenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'correspondence',
        key: 'id',
      },
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id',
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    correspondencestateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'correspondence_state',
        key: 'id',
      },
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,  // True means the record is active
    },
  },
  {
    tableName: "correspondence_events",
    sequelize: database,
    timestamps: false,  // No timestamps needed
  }
);
