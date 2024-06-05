import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const connection = await postgres({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'local',
});

export const db = drizzle(connection, { schema });
