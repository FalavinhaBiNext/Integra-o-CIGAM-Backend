import { CompanyModel } from '@/database/models/Company';
import { UsuarioModel } from '@/database/models/Usuario';
import { ModuloModel } from '@/database/models/Modulo';
import { CompanyModuloModel } from '@/database/models/CompanyModulo';
import { CompanyIntegrationModel } from '@/database/models/CompanyIntegration';
import { BoletoModel } from '@/database/models/Boleto';

CompanyModel.hasMany(UsuarioModel, { foreignKey: 'company_id', as: 'usuarios' });
CompanyModel.hasMany(CompanyModuloModel, { foreignKey: 'company_id', as: 'companyModulos' });
CompanyModel.hasMany(CompanyIntegrationModel, { foreignKey: 'company_id', as: 'companyIntegrations' });
CompanyModel.hasMany(BoletoModel, { foreignKey: 'company_id', as: 'boletos' });

UsuarioModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

ModuloModel.hasMany(CompanyModuloModel, { foreignKey: 'modulo_id', as: 'companyModulos' });

CompanyModuloModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });
CompanyModuloModel.belongsTo(ModuloModel, { foreignKey: 'modulo_id', as: 'modulo' });

CompanyIntegrationModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

BoletoModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

import { RotaModel } from '@/database/models/Rota';
import { ModuloRotaModel } from '@/database/models/ModuloRota';

ModuloModel.hasMany(ModuloRotaModel, { foreignKey: 'modulo_id', as: 'moduloRotas' });
RotaModel.hasMany(ModuloRotaModel, { foreignKey: 'rota_id', as: 'moduloRotas' });

ModuloRotaModel.belongsTo(ModuloModel, { foreignKey: 'modulo_id', as: 'modulo' });
ModuloRotaModel.belongsTo(RotaModel, { foreignKey: 'rota_id', as: 'rota' });
