import { Router } from 'express';
import { authMiddleware } from '@/shared/middlewares/authMiddleware';
import { moduleGuard } from '@/shared/middlewares/moduleGuard';
import { companyRoutes } from '@/modules/company/routes/company.routes';
import { userTypeRoutes } from '@/modules/user-type/routes/user-type.routes';
import { usuarioRoutes } from '@/modules/usuario/routes/usuario.routes';
import { moduloRoutes } from '@/modules/modulo/routes/modulo.routes';
import { companyModuloRoutes } from '@/modules/company-modulo/routes/company-modulo.routes';
import { companyIntegrationRoutes } from '@/modules/company-integration/routes/company-integration.routes';
import { boletoRoutes } from '@/modules/boleto/routes/boleto.routes';
import { authRoutes } from '@/modules/auth/routes/auth.routes';
import { rotaRoutes } from '@/modules/rota/routes/rota.routes';

const globalRoutes = Router();

// Public routes
globalRoutes.use('/auth', authRoutes);

// Protected routes (require authentication)
globalRoutes.use(authMiddleware);
globalRoutes.use(moduleGuard);

globalRoutes.use('/companies', companyRoutes);
globalRoutes.use('/user-types', userTypeRoutes);
globalRoutes.use('/usuarios', usuarioRoutes);
globalRoutes.use('/modulos', moduloRoutes);
globalRoutes.use('/company-modulos', companyModuloRoutes);
globalRoutes.use('/company-integrations', companyIntegrationRoutes);
globalRoutes.use('/boletos', boletoRoutes);
globalRoutes.use('/rotas', rotaRoutes);

export { globalRoutes };
