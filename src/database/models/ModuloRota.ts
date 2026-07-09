import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type ModuloRotaAttributes = {
  id: string;
  modulo_id: string;
  rota_id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type ModuloRotaCreationAttributes = Optional<ModuloRotaAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class ModuloRotaModel extends Model<ModuloRotaAttributes, ModuloRotaCreationAttributes> implements ModuloRotaAttributes {
  declare id: string;
  declare modulo_id: string;
  declare rota_id: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

ModuloRotaModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    modulo_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rota_id: {
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
    tableName: 'modulo_rotas',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
