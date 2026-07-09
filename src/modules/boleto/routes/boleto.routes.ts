import { Router } from 'express';
import { container } from '@/shared/container';
import { uploadBoleto } from '@/config/multer';
import { BoletoController } from '../controllers/boleto.controller';

const boletoController = container.resolve(BoletoController);

const boletoRoutes = Router();

boletoRoutes.get('/', boletoController.findAll.bind(boletoController));
boletoRoutes.get('/company/:companyId', boletoController.findByCompany.bind(boletoController));
boletoRoutes.get('/download/:id', boletoController.download.bind(boletoController));
boletoRoutes.get('/:id', boletoController.findById.bind(boletoController));
boletoRoutes.post('/upload', uploadBoleto.single('file'), boletoController.upload.bind(boletoController));
boletoRoutes.put('/:id', boletoController.update.bind(boletoController));
boletoRoutes.delete('/:id', boletoController.delete.bind(boletoController));
boletoRoutes.patch('/:id/ativo', boletoController.alterAtivo.bind(boletoController));

export { boletoRoutes };
