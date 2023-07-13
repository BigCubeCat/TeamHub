import { TMessage } from "@/types/message";
type TChatStore = { id: string; messages: TMessage[] };
const chat: TChatStore = { id: "", messages: [] };
let listeners: any[] = [];

export const chatStore = {
  setId(text: string) {
    chat.id = text;
    //TODO get messages from API
    chat.messages = [];
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
