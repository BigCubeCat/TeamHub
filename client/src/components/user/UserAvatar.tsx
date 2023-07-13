import React from "react";

import "@style/components/User.scss";
import { TUser } from "@/types/user";

import { Avatar } from "@mui/material";

export default function UserAvatar(props: { user: TUser }) {
  console.log(props.user);
  return (
    <Avatar
      alt={props.user.Username}
      src={props.user.Avatar}
      sx={{ width: 128, height: 128, marginRight: "2em" }}
    />
  );
}
