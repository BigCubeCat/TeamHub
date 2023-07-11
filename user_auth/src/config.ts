export type TConfig = {
  API_ADDRESS: string,
  PORT: number,
  JWT_SECRET: string
};

export let config: TConfig;


export function getConfig() {
  config = {
    API_ADDRESS: "http://127.0.0.1:8090/api/",
    PORT: 5556,
    JWT_SECRET: "qwerty"
  };
}
