import { Router } from 'express';
import { container } from '@/shared/container';
import { CompanyIntegrationController } from '../controllers/company-integration.controller';

const companyIntegrationController = container.resolve(CompanyIntegrationController);

const companyIntegrationRoutes = Router();

companyIntegrationRoutes.get('/', companyIntegrationController.findAll.bind(companyIntegrationController));
companyIntegrationRoutes.get('/company/:companyId', companyIntegrationController.findByCompany.bind(companyIntegrationController));
companyIntegrationRoutes.get('/:id', companyIntegrationController.findById.bind(companyIntegrationController));
companyIntegrationRoutes.post('/', companyIntegrationController.create.bind(companyIntegrationController));
companyIntegrationRoutes.put('/:id', companyIntegrationController.update.bind(companyIntegrationController));
companyIntegrationRoutes.delete('/:id', companyIntegrationController.delete.bind(companyIntegrationController));
companyIntegrationRoutes.patch('/:id/ativo', companyIntegrationController.alterAtivo.bind(companyIntegrationController));

export { companyIntegrationRoutes };
