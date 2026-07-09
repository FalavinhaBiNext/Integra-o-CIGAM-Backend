import { Router } from 'express';
import { container } from '@/shared/container';
import { ModuloController } from '../controllers/modulo.controller';
import { roleMiddleware } from '@/shared/middlewares/roleMiddleware';

const moduloController = container.resolve(ModuloController);

const moduloRoutes = Router();

moduloRoutes.get('/', moduloController.findAll.bind(moduloController));
moduloRoutes.get('/:id', moduloController.findById.bind(moduloController));

// Protect mutation endpoints to SUPERADMIN only
moduloRoutes.use(roleMiddleware(['SUPERADMIN']));

moduloRoutes.post('/', moduloController.create.bind(moduloController));
moduloRoutes.put('/:id', moduloController.update.bind(moduloController));
moduloRoutes.delete('/:id', moduloController.delete.bind(moduloController));
moduloRoutes.patch('/:id/ativo', moduloController.alterAtivo.bind(moduloController));

export { moduloRoutes };
