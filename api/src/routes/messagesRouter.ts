import express from "express";
import { auth } from "../middleware/auth";
import * as messagesController from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.post("/new", messagesController.createMessage);
messageRouter.get("/get", messagesController.loadMessages);

export default messageRouter;
