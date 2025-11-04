import { Database } from "./types.js"; // this is the Database interface we defined earlier
import pg from "pg";
import { Kysely, PostgresDialect, SqliteDialect } from "kysely";
import Database2 from "better-sqlite3";
import config from "../lib/config.js";

const { Pool } = pg;

function productionDialect() {
  console.log("Using production dialect");
  // Use PostgreSQL for production
  return new PostgresDialect({
    pool: new Pool({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      ssl: {
        // You will probably want to use SSL in prod
        // But this disables it for now so you can test
        // require: true,
        rejectUnauthorized: false,
      },
    }),
  });
}

function developmentDialect() {
  console.log("Using development dialect");
  return new SqliteDialect({
    database: new Database2("data.db"),
  });
}

const dialect =
  config.ENV === "production" ? productionDialect() : developmentDialect();

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  log: ["query", "error"],
});
