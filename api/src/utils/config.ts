export const env = { // hardcode for ignore TS type error
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret",
  PORT: process.env.USER_PORT ? process.env.USER_PORT : 8000,
  MONGODB_URL: process.env.MONGODB_URL ? process.env.MONGODB_URL : "mongodb://$root:rootpassword@mongo:27017",
  PAGE_SIZE: process.env.PAGE_SIZE ? Number(process.env.PAGE_SIZE) : 20
};
