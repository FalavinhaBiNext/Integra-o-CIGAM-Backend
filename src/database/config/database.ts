import 'dotenv/config';
import { Options } from 'sequelize';

interface DbConfig {
  [env: string]: Options & {
    use_env_variable?: string;
    storage?: string;
  };
}

const shouldUseSsl = process.env.DB_SSL === 'true';

const config: DbConfig = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './dev.sqlite',
    logging: false,
  },

  test: {
    dialect: 'sqlite',
    storage: process.env.DB_TEST_STORAGE || ':memory:',
    logging: false,
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 10,
      min: Number(process.env.DB_POOL_MIN) || 2,
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: Number(process.env.DB_POOL_IDLE) || 10000,
    },
    dialectOptions: shouldUseSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },
};

export = config;