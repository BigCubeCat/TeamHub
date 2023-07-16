import React, { useState } from "react";
import {
  Dialog, AppBar, IconButton, Typography,
  Toolbar, Box, Tabs, Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserSearch from "./UserSearch";

export default function NewChatDialog(props: {
  open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [screen, setScreen] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setScreen(newValue);
  };

  const handleClose = () => props.setOpen(false);
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Typography >Найти коллегу</Typography>
        {/*
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Создать чат
          </Typography>
        </Toolbar>
        */}
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <UserSearch single={true} handleClose={handleClose} />
      </Box>
    </Dialog>
  );
}
