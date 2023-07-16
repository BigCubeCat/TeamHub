import MessageModel, { I_MessageDocument } from "../models/message.model";
import { env } from "../utils/config";

export async function createMessage(message: I_MessageDocument): Promise<void> {
  try {
    const unixtime = new Date().getTime();
    await MessageModel.create({ ...message, createdAt: unixtime });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loadChat(chatId: string, page: number) {
  try {
    const messages = await MessageModel.find({
      chatId: chatId,
    }).sort({ createdAt: -1 }).skip(page * env.PAGE_SIZE).limit(env.PAGE_SIZE);
    return messages;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
