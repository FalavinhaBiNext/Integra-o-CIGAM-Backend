import { Router } from 'express';
import { container } from '@/shared/container';
import { UsuarioController } from '../controllers/usuario.controller';

const usuarioController = container.resolve(UsuarioController);

const usuarioRoutes = Router();

usuarioRoutes.get('/', usuarioController.findAll.bind(usuarioController));
usuarioRoutes.get('/company/:companyId', usuarioController.findByCompany.bind(usuarioController));
usuarioRoutes.get('/:id', usuarioController.findById.bind(usuarioController));
usuarioRoutes.post('/', usuarioController.create.bind(usuarioController));
usuarioRoutes.put('/:id', usuarioController.update.bind(usuarioController));
usuarioRoutes.delete('/:id', usuarioController.delete.bind(usuarioController));
usuarioRoutes.patch('/:id/ativo', usuarioController.alterAtivo.bind(usuarioController));

export { usuarioRoutes };
