import { Router } from 'express';
import { container } from '@/shared/container';
import { CompanyModuloController } from '../controllers/company-modulo.controller';

const companyModuloController = container.resolve(CompanyModuloController);

const companyModuloRoutes = Router();

companyModuloRoutes.get('/', companyModuloController.findAll.bind(companyModuloController));
companyModuloRoutes.get('/company/:companyId', companyModuloController.findByCompany.bind(companyModuloController));
companyModuloRoutes.get('/modulo/:moduloId', companyModuloController.findByModulo.bind(companyModuloController));
companyModuloRoutes.get('/:id', companyModuloController.findById.bind(companyModuloController));
companyModuloRoutes.post('/', companyModuloController.create.bind(companyModuloController));
companyModuloRoutes.put('/:id', companyModuloController.update.bind(companyModuloController));
companyModuloRoutes.delete('/:id', companyModuloController.delete.bind(companyModuloController));
companyModuloRoutes.patch('/:id/ativo', companyModuloController.alterAtivo.bind(companyModuloController));

export { companyModuloRoutes };
