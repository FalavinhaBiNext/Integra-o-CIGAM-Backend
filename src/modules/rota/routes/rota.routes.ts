import { Router } from 'express';
import { container } from '@/shared/container';
import { RotaController, ModuloRotaController } from '../controllers/rota.controller';
import { roleMiddleware } from '@/shared/middlewares/roleMiddleware';

const rotaController = container.resolve(RotaController);
const moduloRotaController = container.resolve(ModuloRotaController);

const rotaRoutes = Router();

// Only SUPERADMIN can manage system routes and associations
rotaRoutes.use(roleMiddleware(['SUPERADMIN']));

// Rota CRUD
rotaRoutes.get('/', rotaController.findAll.bind(rotaController));
rotaRoutes.get('/:id', rotaController.findById.bind(rotaController));
rotaRoutes.post('/', rotaController.create.bind(rotaController));
rotaRoutes.put('/:id', rotaController.update.bind(rotaController));
rotaRoutes.delete('/:id', rotaController.delete.bind(rotaController));
rotaRoutes.patch('/:id/ativo', rotaController.alterAtivo.bind(rotaController));

// ModuloRota CRUD / Associations
rotaRoutes.get('/modulo-rotas/all', moduloRotaController.findAll.bind(moduloRotaController));
rotaRoutes.get('/modulo-rotas/modulo/:moduloId', moduloRotaController.findByModulo.bind(moduloRotaController));
rotaRoutes.post('/modulo-rotas', moduloRotaController.create.bind(moduloRotaController));
rotaRoutes.delete('/modulo-rotas/:id', moduloRotaController.delete.bind(moduloRotaController));

export { rotaRoutes };
