import { TChatPreviewProps } from "@/types/user";

type TGptHelp = { loaded: boolean; answers: string[], chatList: TChatPreviewProps[] };
let gptHelps: TGptHelp = { loaded: false, answers: [], chatList: [] };
let listeners: any[] = [];

export const gptStore = {
  setAnswers(helps: string[]) {
    gptHelps = { ...gptHelps, answers: helps };
    emitChange();
  },
  setChatList(list: TChatPreviewProps[]) {
    gptHelps = { ...gptHelps, chatList: list };
    emitChange();
  },
  addChat(chat: TChatPreviewProps) {
    gptHelps = { ...gptHelps, chatList: [...gptHelps.chatList, chat] };
    emitChange();
  },
  addHelp(help: string) {
    gptHelps.answers.push(help);
    console.log(gptHelps.answers)
    emitChange();
  },
  setLoaded() {
    gptHelps = { ...gptHelps, loaded: true };
    emitChange();
  },
  deleteHelp(value: string) {
    gptHelps = { ...gptHelps, answers: gptHelps.answers.filter((help) => help != value) };
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
