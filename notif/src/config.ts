import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

interface ENV {
  UPDATE_DELAY: number | undefined;
  EXPRESS_PORT: number | undefined;
  WS_PORT: number | undefined;
  REDIS_URI: string | undefined;
}

interface Config {
  UPDATE_DELAY: number;
  EXPRESS_PORT: number;
  WS_PORT: number;
  REDIS_URI: string;
}

const getConfig = (): ENV => {
  return {
    UPDATE_DELAY: process.env.UPDATE_DELAY ? Number(process.env.UPDATE_DELAY) : undefined,
    WS_PORT: process.env.WS_PORT ? Number(process.env.WS_PORT) : undefined,
    EXPRESS_PORT: process.env.EXPRESS_PORT ? Number(process.env.EXPRESS_PORT) : undefined,
    REDIS_URI: process.env.REDIS_URI
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;



