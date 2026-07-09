import { Router } from 'express';
import { container } from '@/shared/container';
import { CompanyController } from '../controllers/company.controller';
import { roleMiddleware } from '@/shared/middlewares/roleMiddleware';

const companyController = container.resolve(CompanyController);

const companyRoutes = Router();

// Health check (requires authentication, but not restricted by role)
companyRoutes.get('/health', (req, res) => companyController.health(req, res));

// Protect CRUD endpoints to SUPERADMIN only
companyRoutes.use(roleMiddleware(['SUPERADMIN']));

companyRoutes.get('/', companyController.findAll.bind(companyController));
companyRoutes.post('/', companyController.create.bind(companyController));
companyRoutes.get('/:id', companyController.findById.bind(companyController));
companyRoutes.put('/:id', companyController.update.bind(companyController));
companyRoutes.delete('/:id', companyController.delete.bind(companyController));
companyRoutes.patch('/:id/ativo', companyController.alterAtivo.bind(companyController));

export { companyRoutes };
