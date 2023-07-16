import React from "react";

import "@/style/base.scss";
import MessageBubble from "./MessageBubble";

import { Box } from "@mui/material";
import { chatStore } from "@/store/chat";

export default function ChatWidget() {
  const chat = React.useSyncExternalStore(chatStore.subscribe, chatStore.getSnapshot);
  return (
    <Box className="ChatWidget">
      {chat.messages.map((m) => (
        <MessageBubble text={m.text} isRight={m.isMy} />
      ))}
    </Box>
  );
}
