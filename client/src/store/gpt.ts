type TGptHelp = { loaded: boolean; answers: string[] };
const gptHelps: TGptHelp = { loaded: false, answers: [] };
let listeners: any[] = [];

export const gptStore = {
  setAnswers(helps: string[]) {
    gptHelps.answers = helps;
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
