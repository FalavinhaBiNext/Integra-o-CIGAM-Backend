import { Router } from 'express';
import { container } from '@/shared/container';
import { UserTypeController } from '../controllers/user-type.controller';

const userTypeController = container.resolve(UserTypeController);

const userTypeRoutes = Router();

userTypeRoutes.get('/', userTypeController.findAll.bind(userTypeController));
userTypeRoutes.get('/:id', userTypeController.findById.bind(userTypeController));
userTypeRoutes.post('/', userTypeController.create.bind(userTypeController));
userTypeRoutes.put('/:id', userTypeController.update.bind(userTypeController));
userTypeRoutes.delete('/:id', userTypeController.delete.bind(userTypeController));

export { userTypeRoutes };
