import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type UsuarioRole = 'SUPERADMIN' | 'MASTER' | 'ADMIN' | 'USER';

export type UsuarioAttributes = {
  id: string;
  company_id: string;
  nome: string;
  email: string;
  senha: string;
  role: UsuarioRole;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type UsuarioCreationAttributes = Optional<UsuarioAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class UsuarioModel extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  declare id: string;
  declare company_id: string;
  declare nome: string;
  declare email: string;
  declare senha: string;
  declare role: UsuarioRole;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('SUPERADMIN', 'MASTER', 'ADMIN', 'USER'),
      allowNull: false,
      defaultValue: 'USER',
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
