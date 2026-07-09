import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type ModuloAttributes = {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type ModuloCreationAttributes = Optional<ModuloAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class ModuloModel extends Model<ModuloAttributes, ModuloCreationAttributes> implements ModuloAttributes {
  declare id: string;
  declare nome: string;
  declare descricao: string;
  declare icone: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

ModuloModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    icone: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: 'modulos',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
