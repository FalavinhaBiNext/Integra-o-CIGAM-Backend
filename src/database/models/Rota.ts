import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type RotaAttributes = {
  id: string;
  nome: string;
  metodo: string;
  caminho: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type RotaCreationAttributes = Optional<RotaAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class RotaModel extends Model<RotaAttributes, RotaCreationAttributes> implements RotaAttributes {
  declare id: string;
  declare nome: string;
  declare metodo: string;
  declare caminho: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

RotaModel.init(
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
    metodo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    caminho: {
      type: DataTypes.STRING(255),
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
    tableName: 'rotas',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
