import Gpt from "@/components/gpt/Gpt";
import ChatWidget from "@/components/messenger/ChatWidget";
import Message from "@/components/messenger/Message";
import "@/style/messanger/Chat.scss";
import React from "react";

import { Box } from "@mui/material";

export default function Chat() {
  return (
    <Box className="Chat">
      <Message />
      <Gpt />
      <ChatWidget />
    </Box>
  );
}
