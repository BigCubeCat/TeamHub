import { loadChat } from "@/api/chats";
import { TMessage } from "@/types/message";
type TChatStore = { needUpdate: boolean, id: string; messages: TMessage[] };
let chat: TChatStore = {
  needUpdate: false, id: "fuck_q", messages: [
    { text: "Егор, ты сделал стартовый экран?", isMy: false },
    { text: "Почти...", isMy: true },
  ]
};
let listeners: any[] = [];

export const chatStore = {
  setId(text: string, token: string) {
    chat = { ...chat, id: text, messages: [] };
    const fetchNewMessages = async () => {
      await loadChat(token, chat.id, 0);
    };
    fetchNewMessages().catch(console.error);
    emitChange();
  },
  addMessage(text: string) {
    chat = { ...chat, messages: [...chat.messages, { text, isMy: true }] };
    emitChange();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return chat;
  },
};

function emitChange() {
  console.log(chat);
  for (const listener of listeners) {
    listener();
  }
}
