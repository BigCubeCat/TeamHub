import { TChatPreviewProps } from "@my_types/user";
import "@style/components/Chat.scss";
import { getAllChats } from "@/api/chats";

import * as React from "react";
import { IconButton, List } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChatPrev from "./ChatPrev";
import { userStore } from "@/store/user";
import MyPageButton from "./MyPageButton";

export default function FolderList() {
  const user = React.useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );
  const [chatList, setChatList] = React.useState<TChatPreviewProps[]>([]);

  React.useEffect(() => {
    const fetchAPI = async () => {
      const chats = await getAllChats("BigCubeCat" /*user.username*/);
      setChatList(chats);
    };
    fetchAPI().catch(console.error);
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MyPageButton user={user} />
      {chatList.map((chat, i) => (
        <ChatPrev chat={chat} num={i} />
      ))}
      <IconButton onClick={() => console.log("add")}>
        <AddIcon />
      </IconButton>
    </List>
  );
}
