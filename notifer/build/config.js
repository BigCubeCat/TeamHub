"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
const getConfig = () => {
    return {
        UPDATE_DELAY: process.env.UPDATE_DELAY ? Number(process.env.UPDATE_DELAY) : undefined,
        WS_PORT: process.env.WS_PORT ? Number(process.env.WS_PORT) : undefined,
        EXPRESS_PORT: process.env.EXPRESS_PORT ? Number(process.env.EXPRESS_PORT) : undefined,
        REDIS_URI: process.env.REDIS_URI,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    };
};
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
