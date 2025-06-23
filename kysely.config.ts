import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";
import { db } from "./src/backend/db/index.js"; // Import the db instance from your db module
// parse .env file if it exists into process.env
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "db/migrations",
  },
  plugins: [],
  seeds: {
    seedFolder: "db/seeds",
  },
});
