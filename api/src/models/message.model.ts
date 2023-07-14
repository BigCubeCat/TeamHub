import mongoose from "mongoose";

export interface IMessageDoc {
  chatId: string;
  author: string;
  text: string;
  createdAt: number;
}

export interface I_MessageDocument extends IMessageDoc, mongoose.Document { }

const MessageSchema: mongoose.Schema<I_MessageDocument> = new mongoose.Schema({
  chatId: { type: String },
  author: { type: String },
  text: { type: String },
  createdAt: { type: Number },
});

const MessageModel = mongoose.model<I_MessageDocument>("Message", MessageSchema);
export default MessageModel;

