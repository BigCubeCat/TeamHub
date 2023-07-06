import config from "./config";
import { WebSocketServer } from 'ws';
import { delNotif, getValue, initRedisClient, setValue } from "./redis_client";

const wss = new WebSocketServer({ port: config.PORT });
initRedisClient(config.REDIS_URI);


wss.on('connection', function connection(ws) {
  var userId: string = ""; // TODO: fix it
  ws.on('message', function message(data) {
    let json = JSON.parse(data.toString());
    console.log(json)
    if (json.del) {
      delNotif(userId);
    }
    if (json.user) {
      userId = json.user;
      console.log(userId)
    }
  });
  ws.on('close', function close(data) {
    console.log(`closed ${data}`);
  });
  setInterval(function() {
    const req = async () => {
      if (userId === "") {
        return
      }
      const res = await getValue(userId);
      console.log(userId, res)
      if (res) {
        ws.send("notification");
      }
    }
    req().catch(console.error)
  }, config.UPDATE_DELAY);
  ws.send('something');
});

