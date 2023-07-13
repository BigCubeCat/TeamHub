import React, { useEffect, useSyncExternalStore } from "react";
import SideBar from "@/components/messenger/SideBar";
import Chat from "./Chat";

import { Box } from "@mui/material";

import "@style/components/Main.scss";
import { Redirect } from "wouter";
import { loadConfig } from "@/api/suggestions";
import { useCookies } from "react-cookie";
import { userStore } from "@/store/user";

export default function Main() {
  const [cookies] = useCookies(["token"]);
  const user = useSyncExternalStore(userStore.subscribe, userStore.getSnapshot);

  useEffect(() => {
    const fetchConfig = async () => {
      await loadConfig(cookies.token);
    };
    fetchConfig().catch(console.error);
  }, []);

  if (cookies.token === "" || user.Username === "") {
    return <Redirect to="/login/" />;
  }
  return (
    <Box className="Page">
      <Box className="MainContainer">
        <SideBar />
        <Chat />
      </Box>
    </Box>
  );
}
