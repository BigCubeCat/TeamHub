import React from "react";

import "@/style/base.scss";
import { TMessage } from "@/types/message";
import MessageBubble from "./MessageBubble";

import { Box } from "@mui/material";

export default function ChatWidget({ messages }: { messages: TMessage[] }) {
  messages = [
    { Text: "hi", isMy: false },
    {
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      isMy: true,
    },
  ];
  return (
    <Box className="ChatWidget">
      {messages.map((m) => (
        <MessageBubble text={m.Text} isRight={m.isMy} />
      ))}
    </Box>
  );
}
