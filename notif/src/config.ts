interface ENV {
  UPDATE_DELAY: number | undefined;
  EXPRESS_PORT: number | undefined;
  WS_PORT: number | undefined;
  REDIS_URL: string | undefined;
  REDIS_PASSWORD: string | undefined;
};

interface Config {
  UPDATE_DELAY: number;
  EXPRESS_PORT: number;
  WS_PORT: number;
  REDIS_URL: string;
  REDIS_PASSWORD: string;
};

const getConfig = (): ENV => {
  console.log(process.env)
  return {
    UPDATE_DELAY: process.env.UPDATE_DELAY ? Number(process.env.UPDATE_DELAY) : undefined,
    WS_PORT: process.env.WS_PORT ? Number(process.env.WS_PORT) : undefined,
    EXPRESS_PORT: process.env.EXPRESS_PORT ? Number(process.env.EXPRESS_PORT) : undefined,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
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



