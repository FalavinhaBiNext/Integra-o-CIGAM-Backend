import 'dotenv/config';
import { Options } from 'sequelize';

interface DbConfig {
  [env: string]: Options & {
    use_env_variable?: string;
    storage?: string;
  };
}

const shouldUseSsl = process.env.DB_SSL === 'false';

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
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
  },
};

export = config;