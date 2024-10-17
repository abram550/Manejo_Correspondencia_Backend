import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { TipoPago } from "./TipoPago";  // Importar el modelo TipoPago
import { Correspondencia } from "./Correspondencia";  // Importar el modelo Correspondencia

export class Pago extends Model {
  public id!: number;  // Agregar propiedad id
  public correspondenciaId!: ForeignKey<Correspondencia['id']>;
  public monto!: number;
  public tipoPagoId!: ForeignKey<TipoPago['id']>;
  public fechaPago!: Date;
}

export interface PagoI {
  id?: number;
  correspondenciaId: number;
  monto: number;
  fechaPago: Date;
  tipoPagoId: number;
  
}




Pago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // Agregar clave primaria
    },
    correspondenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Correspondencia,  // Relacionar con Correspondencia
        key: "id",
      },
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipoPagoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoPago,  // Relacionar con TipoPago
        key: "id",
      },
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "pagos",
    sequelize: database,
    timestamps: false,
  }
);

// Relaciones
Pago.belongsTo(Correspondencia, { foreignKey: "correspondenciaId", as: "correspondencia" });
Pago.belongsTo(TipoPago, { foreignKey: "tipoPagoId", as: "tipoPago" });
Correspondencia.hasMany(Pago, { foreignKey: "correspondenciaId", as: "pagos" });
