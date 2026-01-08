import { defineConfig } from "prisma/config";
import "dotenv/config";
import dotenv from "dotenv";

// Ensure local development also reads from .env.local when present
dotenv.config({ path: ".env.local", override: true });

const datasourceUrl = process.env.DATABASE_URL || "file:./dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
