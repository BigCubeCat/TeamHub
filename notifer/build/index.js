"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const ws_1 = require("ws");
const redis_client_1 = require("./redis_client");
const wss = new ws_1.WebSocketServer({ port: config_1.default.WS_PORT });
(0, redis_client_1.initRedisClient)(config_1.default.REDIS_PASSWORD, config_1.default.REDIS_URI);
wss.on('connection', function connection(ws) {
    var userId = ""; // TODO: fix it
    ws.on('message', function message(data) {
        console.log(data.toString());
        let json = JSON.parse(data.toString());
        if (json.del) {
            (0, redis_client_1.delNotif)(userId);
            return;
        }
        if (json.user) {
            userId = json.user;
        }
    });
    ws.on('close', function close(data) {
        console.log(`closed ${data}`);
    });
    setInterval(function () {
        const req = () => __awaiter(this, void 0, void 0, function* () {
            if (userId === "") {
                return;
            }
            const res = yield (0, redis_client_1.getValue)(userId);
            if (res) {
                ws.send("notification");
            }
        });
        req().catch(console.error);
    }, config_1.default.UPDATE_DELAY);
    ws.send('something');
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = ['*']; // TODO ТОЛЬКО с контейнера с java бэком
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
// POST method route
app.post('/:name', (req, res) => {
    const userId = req.params.name;
    (0, redis_client_1.setValue)(userId, "norif");
    res.sendStatus(200);
});
app.listen(config_1.default.EXPRESS_PORT, () => {
    console.log('Express server listening on port 5000');
});
