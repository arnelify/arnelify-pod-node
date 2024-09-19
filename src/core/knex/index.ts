#!/usr/bin/env node

import client from "knex";
import env from "core/env";
import path from "path";

const rootDir = process.env.INIT_CWD ?? path.resolve('.');
const migrationsDir = path.resolve(rootDir, 'src/database/migrations');
const seedsDir = path.resolve(rootDir, 'src/database/seeds');

const config: {[key: string]: any} = {
  client: 'mysql2',
  connection: {
    host: env.MYSQL_MASTER_HOST,
    database: env.MYSQL_MASTER_NAME,
    user: env.MYSQL_MASTER_USER,
    password: env.MYSQL_MASTER_PASS
  },
  migrations: {
    tableName: 'migrations',
    directory: migrationsDir,
  },
  seeds: {
    directory: seedsDir,
  },
};

export const knex = client(config);
export default config;