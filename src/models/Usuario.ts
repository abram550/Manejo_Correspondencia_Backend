import { Model, DataTypes, ForeignKey } from "sequelize";
import { database } from "../database/db";
import { TipoUsuario } from "./TipoUsuario"; 

export class Usuario extends Model {
  public id!: number;  // Agregar la propiedad id
  public nombre!: string;
  public direccion!: string;
  public correo!: string;
  public telefono!: string;
  public tipoUsuarioId!: ForeignKey<TipoUsuario['id']>;
}

export interface UsuarioI {
  id: number; // Incluir el id en la interfaz
  nombre: string;
  direccion: string;
  correo: string;
  telefono: string;
  tipoUsuarioId: number;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoUsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoUsuario,
        key: "id",
      },
    },
  },
  {
    tableName: "usuarios",
    sequelize: database,
    timestamps: false,
  }
);

// Relaciones
Usuario.belongsTo(TipoUsuario, {
  foreignKey: "tipoUsuarioId",
  as: "tipoUsuario",
});
TipoUsuario.hasMany(Usuario, {
  foreignKey: "tipoUsuarioId",
});
