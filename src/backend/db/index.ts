import { Database } from "./types.js"; // this is the Database interface we defined earlier
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import config from "@/backend/lib/config.js";
const { Pool } = pg;
const dialect = new PostgresDialect({
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

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
