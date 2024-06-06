import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrate.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:password@localhost:5432/local',
  },
});
