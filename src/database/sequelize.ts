import { Sequelize, Options } from 'sequelize';
import { logger } from '@/shared/utils/logger';

interface DbConfig extends Options {
  use_env_variable?: string;
  storage?: string;
  database?: string;
  username?: string;
  password?: string;
}

interface ConfigByEnv {
  [env: string]: DbConfig;
}

const config: ConfigByEnv = require('@/database/config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

if (!dbConfig) {
  throw new Error(`Configuração de banco não encontrada para o ambiente: ${env}`);
}

const sequelizeOptions: Options = {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  storage: dbConfig.storage,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  dialectOptions: dbConfig.dialectOptions,
};

let sequelize: Sequelize;

const databaseUrl = dbConfig.use_env_variable
  ? process.env[dbConfig.use_env_variable]
  : undefined;

if (databaseUrl) {
  sequelize = new Sequelize(databaseUrl, sequelizeOptions);
} else if (dbConfig.dialect === 'sqlite') {
  sequelize = new Sequelize(sequelizeOptions);
} else {
  if (!dbConfig.database || !dbConfig.username) {
    throw new Error(`Configuração de banco incompleta para o ambiente: ${env}`);
  }

  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password || '',
    sequelizeOptions,
  );
}

export async function connectDatabase(): Promise<void> {
  try {
    logger.info(`Conectando ao banco de dados (${env})...`);

    await sequelize.authenticate();

    logger.success(`Banco de dados conectado com sucesso (${dbConfig.dialect})`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    logger.error(`Erro ao conectar ao banco de dados: ${message}`);

    throw error;
  }
}

export { sequelize };