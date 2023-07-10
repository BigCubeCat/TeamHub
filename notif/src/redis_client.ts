import { RedisClientType, createClient } from 'redis';

let client: RedisClientType;

export function initRedisClient(password: string, url: string) {
  console.log(password);
  client = createClient({ url, password });
  connectClient();
}

function connectClient() {
  const fetchClient = async () => {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
  }
  fetchClient().catch(console.error);
}

/*
 * setValue(key:string, value: string)
 * set key-value :-)
 */
export function setValue(key: string, value: string) {
  const res = async () => await client.set(key, value);
  res().catch(console.error);
}

/*
 * getValue(key: string)
 * return value by key
 */
export async function getValue(key: string) {
  return await client.get(key);
}

/*
 * delNotif(key: string)
 * delete notification from redis
 */
export function delNotif(key: string) {
  const res = async () => await client.del(key);
  res().catch(console.error)
}

