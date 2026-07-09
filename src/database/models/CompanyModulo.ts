import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type CompanyModuloAttributes = {
  id: string;
  company_id: string;
  modulo_id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type CompanyModuloCreationAttributes = Optional<CompanyModuloAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class CompanyModuloModel extends Model<CompanyModuloAttributes, CompanyModuloCreationAttributes> implements CompanyModuloAttributes {
  declare id: string;
  declare company_id: string;
  declare modulo_id: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

CompanyModuloModel.init(
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
    modulo_id: {
      type: DataTypes.UUID,
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
    tableName: 'company_modulos',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
