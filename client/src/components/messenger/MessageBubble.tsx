import React from "react";
import { Box, Typography } from "@mui/material";

export default function MessageBubble(props: {
  text: string;
  isRight: boolean;
}) {
  const align = props.isRight ? "end" : "start";
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: align,
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          minWidth: 100,
          borderRadius: 5,
          padding: 2,
          backgroundColor: props.isRight ? "primary.light" : "secondary.light",
        }}
      >
        <Typography sx={{ overflowWrap: "wrap" }}>{props.text}</Typography>
      </Box>
    </Box>
  );
}
