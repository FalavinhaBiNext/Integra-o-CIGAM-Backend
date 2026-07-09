import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type UserTypeAttributes = {
  id: string;
  tipo: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type UserTypeCreationAttributes = Optional<UserTypeAttributes, 'id' | 'active' | 'created_at' | 'updated_at'>;

export class UserTypeModel extends Model<UserTypeAttributes, UserTypeCreationAttributes> implements UserTypeAttributes {
  declare id: string;
  declare tipo: string;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

UserTypeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    tableName: 'user_types',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
