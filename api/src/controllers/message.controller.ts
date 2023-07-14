import { Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import * as messagesServices from "../service/message.service";
import { CustomRequest } from "../middleware/auth";
import { getStringToken } from "../utils/auth";

export const loadMessages = async (req: Request, res: Response) => {
  try {
    const page = (typeof req.query.page === "string") ? Number(req.query.page) : 0;
    const username = getStringToken(req);
    if (req.body.chatId.includes(username)) {
      const messages = await messagesServices.loadChat(req.body.chatId, page);
      return res.status(200).send({ messages: messages });
    }
    res.status(403).send("Forbidden");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export const createMessage = async (req: Request, res: Response) => {
  try {
    const username = getStringToken(req);
    if (req.body.chatId.includes(username)) {
      // If message author in chat
      await messagesServices.createMessage({ ...req.body, author: username });
    } else {
      res.status(403).send("Forbidden");
    }
    res.status(200).send("Success");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

