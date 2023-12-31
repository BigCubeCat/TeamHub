export type TUser = {
  Username: string;
  Name: string;
  Surname: string;
  Lastname: string;
  Avatar?: string;
};

export type TChatPreviewProps = {
  ChatId: string;
  User: TUser;
  Notification: boolean;
};
