import React from "react";

import { Chip } from "@mui/material";
import { messageStore } from "@/store/message";

export default function HelpBubble(props: { help: string }) {
  const handleClick = () => {
    messageStore.setMessage(props.help);

    console.log(props.help);
  };
  return (
    <Chip
      sx={{ marginRight: "1em" }}
      label={props.help}
      variant="outlined"
      onClick={handleClick}
    />
  );
}
