import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import config from "../lib/config.js";
import { Database } from "./types.js"; // this is the Database interface we defined earlier

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    ssl: false,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  log: ["query", "error"],
});
