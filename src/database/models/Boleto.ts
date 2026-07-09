import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type BoletoAttributes = {
  id: string;
  company_id: string;
  cnpj_cliente: string;
  empresa: string;
  telefone: string;
  contato: string;
  nome_arquivo: string;
  num_lancamento: string;
  vencimento: Date | null;
  valor: string | null;
  codigo_empresa: string | null;
  data_recebimento: Date | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type BoletoCreationAttributes = Optional<BoletoAttributes, 'id' | 'vencimento' | 'valor' | 'codigo_empresa' | 'data_recebimento' | 'active' | 'created_at' | 'updated_at'>;

export class BoletoModel extends Model<BoletoAttributes, BoletoCreationAttributes> implements BoletoAttributes {
  declare id: string;
  declare company_id: string;
  declare cnpj_cliente: string;
  declare empresa: string;
  declare telefone: string;
  declare contato: string;
  declare nome_arquivo: string;
  declare num_lancamento: string;
  declare vencimento: Date | null;
  declare valor: string | null;
  declare codigo_empresa: string | null;
  declare data_recebimento: Date | null;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

BoletoModel.init(
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
    cnpj_cliente: {
      type: DataTypes.STRING(18),
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    contato: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nome_arquivo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    num_lancamento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    valor: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    codigo_empresa: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    data_recebimento: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'boletos',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
