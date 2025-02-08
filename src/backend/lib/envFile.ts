// parse .env file if it exists into process.env
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { ROOTDIR } from "./config.js";

export const processEnvFile = () => {
  const envfiles = [
    resolve(ROOTDIR, "..", ".env.local"),
    resolve(ROOTDIR, "..", ".env"),
  ];
  for (const envfile of envfiles) {
    if (tryEnvFile(envfile)) {
      return;
    }
  }
};

const tryEnvFile = (envfile: string) => {
  console.log("Checking for env file at", envfile);
  if (existsSync(envfile)) {
    console.log("Reading env file at", envfile);
    const env = readFileSync(envfile, "utf-8");
    env.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      process.env[key] = value;
      console.log("Setting", key, "to", value);
    });
    return true;
  }
  return false;
};
