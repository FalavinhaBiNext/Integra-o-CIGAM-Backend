import { Router } from 'express';
import { container } from '@/shared/container';
import { LoginController } from '../controllers/auth.controller';

const loginController = container.resolve(LoginController);

const authRoutes = Router();

authRoutes.post('/login', (req, res, next) => loginController.handle(req, res, next));

export { authRoutes };
