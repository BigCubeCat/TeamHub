import { TChatPreviewProps } from "@/types/user";

type TGptHelp = { loaded: boolean; answers: string[], chatList: TChatPreviewProps[] };
const gptHelps: TGptHelp = { loaded: false, answers: [], chatList: [] };
let listeners: any[] = [];

export const gptStore = {
  setAnswers(helps: string[]) {
    gptHelps.answers = helps;
    emitChange();
  },
  setChatList(list: TChatPreviewProps[]) {
    gptHelps.chatList = list;
    emitChange();
  },
  addChat(chat: TChatPreviewProps) {
    gptHelps.chatList.push(chat);
    emitChange();
  },
  addHelp(help: string) {
    gptHelps.answers.push(help);
    emitChange();
  },
  setLoaded() {
    gptHelps.loaded = true;
    emitChange();
  },
  deleteHelp(value: string) {
    gptHelps.answers = gptHelps.answers.filter((help) => help != value);
    emitChange();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return gptHelps;
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
