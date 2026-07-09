import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type CompanyAttributes = {
  id: string;
  nome: string;
  cnpj: string;
  status: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type CompanyCreationAttributes = Optional<CompanyAttributes, 'id' | 'status' | 'active' | 'created_at' | 'updated_at'>;

export class CompanyModel extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  declare id: string;
  declare nome: string;
  declare cnpj: string;
  declare status: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

CompanyModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'ativo',
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
    tableName: 'companies',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
