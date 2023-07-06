import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8888 });

import { createClient } from 'redis';

const fetchAPI = async () => {
  const client = createClient({
    url: 'redis://127.0.0.1:6379'
  });

  client.on('error', err => console.log('Redis Client Error', err));
  client.connect();


  await client.set('key', 'value');
  const value = await client.get('key');
  console.log(value)
}
fetchAPI().catch(console.error)




wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    ws.send(`message ${data}`);
  });
  ws.on('close', function close(data) {
    console.log(`closed ${data}`);
  });
  ws.send('something');
});

