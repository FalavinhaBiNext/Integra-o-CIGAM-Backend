import 'reflect-metadata';
import 'module-alias/register';
import { app } from '@/app';
import { logger } from '@/shared/utils/logger';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, () => {
  logger.success(`Servidor rodando na porta ${PORT}`);
  logger.info(`API disponível em: ${HOST}:${PORT}/api/v1`);
  logger.info(`Health check: ${HOST}:${PORT}/health`);
});
