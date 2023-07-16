import React, { useSyncExternalStore } from "react";

import "@/style/messanger/Chat.scss";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import { messageStore } from "@/store/message";
import { chatStore } from "@/store/chat";
import { sendMessage } from "@/api/chats";
import { useCookies } from "react-cookie";

export default function Message() {
  const chat = useSyncExternalStore(chatStore.subscribe, chatStore.getSnapshot);
  const [cookies] = useCookies(["token"]);
  const message = React.useSyncExternalStore(
    messageStore.subscribe,
    messageStore.getSnapshot,
  );
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    messageStore.setMessage(newValue);
  };
  const handleClick = () => {
    if (message === "") {
      return;
    }
    // отправка сообщения
    sendMessage(cookies.token, chat.id, message);
    chatStore.addMessage(message);
    messageStore.resetMessage();
  };

  return (
    <Box className="Message">
      <TextField
        id="outlined-basic"
        variant="standard"
        sx={{
          position: "relative",
          width: "100%",
          paddingLeft: 1,
        }}
        value={message}
        onChange={(e) => handleChange(e)}
      />
      <IconButton onClick={() => handleClick()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
