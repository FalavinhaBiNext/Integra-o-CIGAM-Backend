import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from '@/database/sequelize';

export type StatusConexao = 'Conectado' | 'Desconectado' | 'Erro' | 'Nao_Testado';

export type CompanyIntegrationAttributes = {
  id: string;
  company_id: string;
  empresa: string;
  login: string;
  senha: string;
  url_portal: string;
  token: string;
  status_conexao: StatusConexao;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

type CompanyIntegrationCreationAttributes = Optional<CompanyIntegrationAttributes, 'id' | 'status_conexao' | 'active' | 'created_at' | 'updated_at'>;

export class CompanyIntegrationModel extends Model<CompanyIntegrationAttributes, CompanyIntegrationCreationAttributes> implements CompanyIntegrationAttributes {
  declare id: string;
  declare company_id: string;
  declare empresa: string;
  declare login: string;
  declare senha: string;
  declare url_portal: string;
  declare token: string;
  declare status_conexao: StatusConexao;
  declare active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

CompanyIntegrationModel.init(
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
    empresa: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url_portal: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status_conexao: {
      type: DataTypes.ENUM('Conectado', 'Desconectado', 'Erro', 'Nao_Testado'),
      allowNull: false,
      defaultValue: 'Nao_Testado',
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
    tableName: 'company_integrations',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
