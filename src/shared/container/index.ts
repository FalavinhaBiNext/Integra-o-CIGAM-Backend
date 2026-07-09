import 'reflect-metadata';
import { container } from 'tsyringe';

export { container };

import { CompanyModel } from '@/database/models/Company';
import { CompanyRepository } from '@/modules/company/repositories/company.repository';
import { ICompanyRepository } from '@/modules/company/interfaces/company.interface';
import { CompanyService } from '@/modules/company/services/company.service';
import { CompanyController } from '@/modules/company/controllers/company.controller';

import { UserTypeModel } from '@/database/models/UserType';
import { UserTypeRepository } from '@/modules/user-type/repositories/user-type.repository';
import { IUserTypeRepository } from '@/modules/user-type/interfaces/user-type.interface';
import { UserTypeService } from '@/modules/user-type/services/user-type.service';
import { UserTypeController } from '@/modules/user-type/controllers/user-type.controller';

import { UsuarioModel } from '@/database/models/Usuario';
import { UsuarioRepository } from '@/modules/usuario/repositories/usuario.repository';
import { IUsuarioRepository } from '@/modules/usuario/interfaces/usuario.interface';
import { UsuarioService } from '@/modules/usuario/services/usuario.service';
import { UsuarioController } from '@/modules/usuario/controllers/usuario.controller';

import { ModuloModel } from '@/database/models/Modulo';
import { ModuloRepository } from '@/modules/modulo/repositories/modulo.repository';
import { IModuloRepository } from '@/modules/modulo/interfaces/modulo.interface';
import { ModuloService } from '@/modules/modulo/services/modulo.service';
import { ModuloController } from '@/modules/modulo/controllers/modulo.controller';

import { CompanyModuloModel } from '@/database/models/CompanyModulo';
import { CompanyModuloRepository } from '@/modules/company-modulo/repositories/company-modulo.repository';
import { ICompanyModuloRepository } from '@/modules/company-modulo/interfaces/company-modulo.interface';
import { CompanyModuloService } from '@/modules/company-modulo/services/company-modulo.service';
import { CompanyModuloController } from '@/modules/company-modulo/controllers/company-modulo.controller';

import { CompanyIntegrationModel } from '@/database/models/CompanyIntegration';
import { CompanyIntegrationRepository } from '@/modules/company-integration/repositories/company-integration.repository';
import { ICompanyIntegrationRepository } from '@/modules/company-integration/interfaces/company-integration.interface';
import { CompanyIntegrationService } from '@/modules/company-integration/services/company-integration.service';
import { CompanyIntegrationController } from '@/modules/company-integration/controllers/company-integration.controller';

import { BoletoModel } from '@/database/models/Boleto';
import { BoletoRepository } from '@/modules/boleto/repositories/boleto.repository';
import { IBoletoRepository } from '@/modules/boleto/interfaces/boleto.interface';
import { BoletoService } from '@/modules/boleto/services/boleto.service';
import { BoletoController } from '@/modules/boleto/controllers/boleto.controller';

import { LoginService } from '@/modules/auth/services/auth.service';
import { LoginController } from '@/modules/auth/controllers/auth.controller';

import '@/database/models/associations';

container.register('CompanyModel', { useValue: CompanyModel });
container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);
container.registerSingleton('CompanyService', CompanyService);
container.registerSingleton('CompanyController', CompanyController);

container.register('UserTypeModel', { useValue: UserTypeModel });
container.registerSingleton<IUserTypeRepository>('UserTypeRepository', UserTypeRepository);
container.registerSingleton('UserTypeService', UserTypeService);
container.registerSingleton('UserTypeController', UserTypeController);

container.register('UsuarioModel', { useValue: UsuarioModel });
container.registerSingleton<IUsuarioRepository>('UsuarioRepository', UsuarioRepository);
container.registerSingleton('UsuarioService', UsuarioService);
container.registerSingleton('UsuarioController', UsuarioController);

container.register('ModuloModel', { useValue: ModuloModel });
container.registerSingleton<IModuloRepository>('ModuloRepository', ModuloRepository);
container.registerSingleton('ModuloService', ModuloService);
container.registerSingleton('ModuloController', ModuloController);

container.register('CompanyModuloModel', { useValue: CompanyModuloModel });
container.registerSingleton<ICompanyModuloRepository>('CompanyModuloRepository', CompanyModuloRepository);
container.registerSingleton('CompanyModuloService', CompanyModuloService);
container.registerSingleton('CompanyModuloController', CompanyModuloController);

container.register('CompanyIntegrationModel', { useValue: CompanyIntegrationModel });
container.registerSingleton<ICompanyIntegrationRepository>('CompanyIntegrationRepository', CompanyIntegrationRepository);
container.registerSingleton('CompanyIntegrationService', CompanyIntegrationService);
container.registerSingleton('CompanyIntegrationController', CompanyIntegrationController);

container.register('BoletoModel', { useValue: BoletoModel });
container.registerSingleton<IBoletoRepository>('BoletoRepository', BoletoRepository);
container.registerSingleton('BoletoService', BoletoService);
container.registerSingleton('BoletoController', BoletoController);

container.registerSingleton('LoginService', LoginService);
container.registerSingleton('LoginController', LoginController);

import { RotaModel } from '@/database/models/Rota';
import { ModuloRotaModel } from '@/database/models/ModuloRota';
import { RotaRepository } from '@/modules/rota/repositories/rota.repository';
import { ModuloRotaRepository } from '@/modules/rota/repositories/modulo-rota.repository';
import { IRotaRepository, IModuloRotaRepository } from '@/modules/rota/interfaces/rota.interface';
import { RotaService, ModuloRotaService } from '@/modules/rota/services/rota.service';
import { RotaController, ModuloRotaController } from '@/modules/rota/controllers/rota.controller';

container.register('RotaModel', { useValue: RotaModel });
container.registerSingleton<IRotaRepository>('RotaRepository', RotaRepository);
container.registerSingleton('RotaService', RotaService);
container.registerSingleton('RotaController', RotaController);

container.register('ModuloRotaModel', { useValue: ModuloRotaModel });
container.registerSingleton<IModuloRotaRepository>('ModuloRotaRepository', ModuloRotaRepository);
container.registerSingleton('ModuloRotaService', ModuloRotaService);
container.registerSingleton('ModuloRotaController', ModuloRotaController);
