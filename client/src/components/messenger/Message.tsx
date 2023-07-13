import React from "react";

import "@/style/messanger/Chat.scss";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import { messageStore } from "@/store/message";

export default function Message() {
  const message = React.useSyncExternalStore(
    messageStore.subscribe,
    messageStore.getSnapshot,
  );
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    messageStore.setMessage(newValue);
  };
  const handleClick = () => {
    // TODO API callback
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
