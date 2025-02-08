import "@/backend/lib/envFile.js";
import path from "path";
import { z } from "zod";
export const __dirname = import.meta.dirname;
export const ROOTDIR = path.join(__dirname, "../../");
export const PAGESDIR = path.join(ROOTDIR, "frontend/pages");

const configSchema = z.object({
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z
    .string()
    .default("5432")
    .transform((v) => parseInt(v)),
  DB_USER: z.string().default("postgres"),
  DB_PASSWORD: z.string().default("password"),
  DB_DATABASE: z.string().default("your-database-name"),
});

type Config = z.infer<typeof configSchema>;
const config: Config = configSchema.parse(process.env);
export default config;
