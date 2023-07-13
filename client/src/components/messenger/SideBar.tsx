import ChatList from "@chat/ChatList";
import "@style/base.scss";

import { Box } from "@mui/material";

export default function SideBar() {
  return (
    <Box className="SideBar">
      <ChatList />
    </Box>
  );
}
