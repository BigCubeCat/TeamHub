let message: string = "";
let messageListeners = [];

export const messageStore = {
  setMessage(text: string) {
    message = text;
    emitChange();
  },
  resetMessage() {
    message = "";
    emitChange();
  },
  subscribe(listener: any) {
    messageListeners = [...messageListeners, listener];
    return () => {
      messageListeners = messageListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return message;
  },
};

function emitChange() {
  for (let messageListener of messageListeners) {
    messageListener();
  }
}
