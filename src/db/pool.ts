import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const db = drizzle(
  postgres('postgres://postgres:password@localhost:5432/local'),
);
