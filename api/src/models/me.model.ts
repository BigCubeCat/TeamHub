import mongoose from "mongoose";

export interface IMeDoc {
  username: string;
  helps: Array<string>;
  chats: Array<string>;
}

export interface I_MeDocument extends IMeDoc, mongoose.Document { }

const MeSchema: mongoose.Schema<I_MeDocument> = new mongoose.Schema({
  username: { type: String, unique: true },
  helps: [{ type: String }],
  chats: [{ type: String }],
});

const MeModel = mongoose.model<I_MeDocument>("Me", MeSchema);
export default MeModel;
