import { Sequelize, Options } from 'sequelize';
import { logger } from '@/shared/utils/logger';

interface DbConfig {
  [env: string]: Options & { storage?: string };
}

const config: DbConfig = require('@/database/config/database');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database as string || '',
  dbConfig.username as string || '',
  dbConfig.password as string || '',
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
  } as Options,
);

logger.info(`Conectando ao banco de dados (${env})...`);

sequelize.authenticate()
  .then(() => {
    logger.success(`Banco de dados conectado com sucesso (${dbConfig.dialect})`);
  })
  .catch((error) => {
    logger.error(`Erro ao conectar ao banco de dados: ${error.message}`);
  });

export { sequelize };
