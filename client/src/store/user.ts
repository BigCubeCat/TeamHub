import { TUser } from "@/types/user";

const defaultUser: TUser = {
  Username: "",
  Name: "",
  Surname: "",
  Lastname: "",
};
let user: TUser = defaultUser;
let userListeners = [];

export const userStore = {
  setUser(newUser: TUser) {
    user = newUser;
    emitChange();
  },
  resetUser() {
    user = defaultUser;
    emitChange();
  },
  subscribe(listener: any) {
    userListeners = [...userListeners, listener];
    return () => {
      userListeners = userListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return user;
  },
};

function emitChange() {
  for (const listener of userListeners) {
    listener();
  }
}
