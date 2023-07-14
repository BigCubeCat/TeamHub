import { TChatPreviewProps } from "@my_types/user";
import "@style/components/Chat.scss";
import { getAllChats } from "@/api/chats";

import * as React from "react";
import { Box, Button, Divider, IconButton, List, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChatPrev from "./ChatPrev";
import { userStore } from "@/store/user";
import MyPageButton from "./MyPageButton";
import { useIsMobile } from "@/utils/resize";
import NewChatDialog from "../search/NewChatDialog";
import { gptStore } from "@/store/gpt";

export default function ChatList() {
  const user = React.useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );
  const chatList = React.useSyncExternalStore(gptStore.subscribe, gptStore.getSnapshot).chatList;
  console.log(chatList);
  const [searchIsOpen, setOpen] = React.useState<boolean>(false);
  const openDialog = () => setOpen(true);
  const isMobile = useIsMobile();

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

      <Box sx={{
        display: "felx", justifyContent: 'start',
        alignItems: "center", marginTop: 5
      }}>
        {isMobile ? <IconButton onClick={openDialog}>
          <AddIcon />
        </IconButton> :
          <Button variant="text" endIcon={<AddIcon />} onClick={openDialog}>
            Добавить чат
          </Button>
        }
      </Box>
      {searchIsOpen && <NewChatDialog open={searchIsOpen} setOpen={setOpen} />}
    </List>
  );
}
