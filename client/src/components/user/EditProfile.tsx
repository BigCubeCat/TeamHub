import React from "react";
import { Redirect } from "wouter";

import "@style/components/Login.scss";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { editUser } from "@/api/auth";
import { userStore } from "@/store/user";
import UploadAvatar from "../user/UploadAvatar";
import { useCookies } from "react-cookie";
import { ArrowBackIos } from "@mui/icons-material";
import HelpList from "./HelpList";

export default function EditProfile() {
  const [cookies] = useCookies(["token"]);
  const user = React.useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );

  const [clicked, setClicked] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>(
    user.Avatar ? user.Avatar : "",
  );
  const [name, setName] = React.useState<string>(user.Name);
  const [surname, setSurname] = React.useState<string>(user.Surname);
  const [lastname, setLastname] = React.useState<string>(user.Lastname);

  const onNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setName(e.target.value);
  };
  const onSurnameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSurname(e.target.value);
  };
  const onLastNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setLastname(e.target.value);
  };

  if (clicked) {
    return <Redirect to="/" />;
  }

  const submitForm = () => {
    console.log(name, surname, lastname, image, cookies.token);
    editUser(name, surname, lastname, image, cookies.token);
    user.Name = name;
    user.Surname = surname;
    user.Lastname = lastname;
    user.Avatar = image;
    userStore.setUser(user);
  };
  return (
    <Box className="LoginFormContainer">
      <IconButton
        sx={{ position: "absolute", top: 0, left: 0 }}
        onClick={() => setClicked(true)}
      >
        <ArrowBackIos />
      </IconButton>
      <Box className="LoginForm">
        <Typography className="Title">Изменить пользователя</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <UploadAvatar defaultAvatar={image} callback={setImage} />
          <Typography variant="body2" sx={{ width: "100%" }} textAlign="center">
            Аватар
          </Typography>
        </Box>
        <TextField
          label="Фамилия"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={surname}
          onChange={onSurnameChange}
        />
        <TextField
          label="Имя"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={name}
          onChange={onNameChange}
        />
        <TextField
          label="Отчество"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={lastname}
          onChange={onLastNameChange}
        />
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => submitForm()}
        >
          Сохранить изменения
        </Button>
        <HelpList />
      </Box>
    </Box>
  );
}
