import { TMessage } from "@/types/message";
type TChatStore = { needUpdate: boolean, id: string; messages: TMessage[] };
const chat: TChatStore = {
  needUpdate: false, id: "fuck_q", messages: [
    { text: "Егор, ты сделал стартовый экран?", isMy: false },
    { text: "Почти...", isMy: true },
  ]
};
let listeners: any[] = [];

export const chatStore = {
  setId(text: string) {
    chat.id = text;
    chat.messages = [];
    emitChange();
  },
  addMessage(text: string) {
    chat.messages.push({ text, isMy: true });
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
  for (const listener of listeners) {
    listener();
  }
}
