import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";

// parse .env file if it exists into process.env
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export const __dirname = import.meta.dirname;
const envfiles = [resolve(__dirname, ".env.local"), resolve(__dirname, ".env")];
for (const envfile of envfiles) {
  if (tryEnvFile(envfile)) {
    break;
  }
}

function tryEnvFile(envfile: string) {
  console.log("Checking for env file at", envfile);
  if (existsSync(envfile)) {
    console.log("Reading env file at", envfile);
    const env = readFileSync(envfile, "utf-8");
    env.split("\n").forEach((line) => {
      if (line.trim() === "" || line.startsWith("#")) return;
      const [key, value] = line.split("=");
      process.env[key] = value;
      console.log("Setting", key, "to", value);
    });
    return true;
  }
  return false;
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    // You will probably want to use SSL in prod
    // But this disables it for now so you can test
    // require: true,
    rejectUnauthorized: false,
  },
});

export default defineConfig({
  dialect: "pg",
  dialectConfig: {
    pool,
  },
  migrations: {
    migrationFolder: "db/migrations",
  },
  plugins: [],
  seeds: {
    seedFolder: "db/seeds",
  },
});
