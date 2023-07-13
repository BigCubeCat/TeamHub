import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { Redirect } from "wouter";

export default function MyPageButton(props: { user: TUser }) {
  const [clicked, setClicked] = React.useState<boolean>(false);
  if (clicked) {
    return <Redirect to="/edit/" />;
  }
  return (
    <IconButton onClick={() => setClicked(true)} sx={{
      width: "100%", justifyContent: 'center', display: "center"
    }}>
      <Avatar src={props.user.Avatar} sx={{ width: 64, height: 64 }} />
    </IconButton>
  );
}
