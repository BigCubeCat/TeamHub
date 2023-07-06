import { RedisClientType, createClient } from 'redis';

let client: RedisClientType;

function initRedisClient(uri: string) {
  client = createClient({
    url: uri
  });
  connectClient();
}

function connectClient() {
  const fetchClient = async () => {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
  }
  fetchClient().catch(console.error);
}

async function setValue(key: string, value: string) {
  await client.set(key, value);
}

async function getValue(key: string) {
  return await client.get(key);
}

export { initRedisClient, client, setValue, getValue };
