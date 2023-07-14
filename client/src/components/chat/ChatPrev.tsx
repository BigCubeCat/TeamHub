import React from "react";
import "@style/components/ChatPrev.scss";
import { TChatPreviewProps } from "@/types/user";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { NotifBage } from "./NotifBage";
import { useIsMobile } from "@/utils/resize";
import { chatStore } from "@/store/chat";
import { joinUsernames } from "@/utils/chat";
import { userStore } from "@/store/user";

const UserAva = (props: { notif: boolean; ava: any }) => {
  if (props.notif) {
    return (
      <NotifBage
        overlap="circular"
        variant="dot"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {props.ava}
      </NotifBage>
    );
  }
  return props.ava;
};

export default function ChatPrev(props: {
  chat: TChatPreviewProps;
  num: number;
}) {
  const user = React.useSyncExternalStore(userStore.subscribe, userStore.getSnapshot);
  const ava = <Avatar src={props.chat.User.Avatar} />;

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <ListItem
        sx={{ marginLeft: 1 }}>
        <UserAva notif={props.chat.Notification} ava={ava}
        />
      </ListItem>
    );
  }

  return (
    <>
      <ListItem
        onClick={() => chatStore.setId(joinUsernames([user.Username, props.chat.User.Username]))}
      >
        <ListItemAvatar>
          <UserAva notif={props.chat.Notification} ava={ava} />
        </ListItemAvatar>
        <ListItemText
          primary={props.chat.User.Name}
          secondary={
            <React.Fragment>@{props.chat.User.Username}</React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
