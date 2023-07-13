export type TUserFormController = {
  username: string;
  name: string;
  surname: string;
  lastname: string;
  password: string;
  repeatPassword: string;
  showPassword: boolean;
};

export const defaultUserForm: TUserFormController = {
  username: "",
  name: "",
  surname: "",
  lastname: "",
  password: "",
  showPassword: false,
};
