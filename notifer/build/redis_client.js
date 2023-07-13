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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delNotif = exports.getValue = exports.setValue = exports.initRedisClient = void 0;
const redis_1 = require("redis");
let client;
function initRedisClient(password, url) {
    client = (0, redis_1.createClient)({ url, password });
    connectClient();
}
exports.initRedisClient = initRedisClient;
function connectClient() {
    const fetchClient = () => __awaiter(this, void 0, void 0, function* () {
        client.on('error', err => console.log('Redis Client Error', err));
        yield client.connect();
    });
    fetchClient().catch(console.error);
}
/*
 * setValue(key:string, value: string)
 * set key-value :-)
 */
function setValue(key, value) {
    const res = () => __awaiter(this, void 0, void 0, function* () { return yield client.set(key, value); });
    res().catch(console.error);
}
exports.setValue = setValue;
/*
 * getValue(key: string)
 * return value by key
 */
function getValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client.get(key);
    });
}
exports.getValue = getValue;
/*
 * delNotif(key: string)
 * delete notification from redis
 */
function delNotif(key) {
    const res = () => __awaiter(this, void 0, void 0, function* () { return yield client.del(key); });
    res().catch(console.error);
}
exports.delNotif = delNotif;
