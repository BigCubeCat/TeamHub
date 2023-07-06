import config from "./config";
import { WebSocketServer } from 'ws';
import { getValue, initRedisClient, setValue } from "./redis_client";

const wss = new WebSocketServer({ port: config.PORT });
initRedisClient(config.REDIS_URI);


wss.on('connection', function connection(ws) {
  var userId: string = "";
  ws.on('message', function message(data) {
    userId = data.toString();
    setValue(userId, "yes");
    console.log(data);
  });
  ws.on('close', function close(data) {
    console.log(`closed ${data}`);
  });
  setInterval(function() {
    const req = async () => {
      const res = await getValue(`user_${userId}`);
      console.log(userId, res)
      if (res) {
        ws.send("notification");
      }
    }
    req().catch(console.error)

  }, config.UPDATE_DELAY);
  ws.send('something');
});

