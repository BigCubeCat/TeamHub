import React from "react";
import { Link, Redirect } from "wouter";

import "@style/components/Login.scss";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TUserFormController } from "./formController";
import { registerUser } from "@/api/auth";
import { TUser } from "@/types/user";
import { userStore } from "@/store/user";
import UploadAvatar from "../user/UploadAvatar";
import { useCookies } from "react-cookie";

// TODO  разделить это на 2 формы

export default function Register() {
  const user = React.useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );
  const defaultUserForm: TUserFormController = {
    username: user.Username,
    name: user.Name,
    surname: user.Surname,
    lastname: user.Lastname,
    password: "",
    repeatPassword: "",
    showPassword: false,
  };
  const [form, setForm] = React.useState<TUserFormController>(defaultUserForm);
  const [image, setImage] = React.useState<string>(
    user.Avatar ? user.Avatar : "",
  );
  const [token, setToken] = React.useState<string>("");
  const [cookies, setCookie] = useCookies(["token"]);

  const onUsernameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, username: e.currentTarget.value });
  };
  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, password: e.currentTarget.value });
  };
  const onRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, repeatPassword: e.currentTarget.value });
  };
  const onSurnameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, surname: e.currentTarget.value });
  };
  const onNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, name: e.currentTarget.value });
  };
  const onLastNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setForm({ ...form, lastname: e.currentTarget.value });
  };

  if (token !== "") {
    setCookie("token", token, { path: "/" });
    return <Redirect to="/" />;
  }

  const submitForm = () => {
    const user: TUser = {
      Username: form.username,
      Name: form.name,
      Surname: form.surname,
      Lastname: form.lastname,
      Avatar: image,
    };
    registerUser(user, form.password, setToken);
    userStore.setUser(user);
  };
  return (
    <Box className="LoginFormContainer">
      <Box className="LoginForm">
        <Typography className="Title">TeamHub регистрация</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <UploadAvatar defaultAvatar="" callback={setImage} />
          <Typography variant="body2" sx={{ width: "100%" }} textAlign="center">
            Аватар
          </Typography>
        </Box>
        <TextField
          label="Ник"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.username}
          onChange={onUsernameChange}
        />
        <TextField
          label="Фамилия"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.surname}
          onChange={onSurnameChange}
        />
        <TextField
          label="Имя"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.name}
          onChange={onNameChange}
        />
        <TextField
          label="Отчество"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.lastname}
          onChange={onLastNameChange}
        />
        <FormControl sx={{ width: "100%", marginBottom: 5 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={form.showPassword ? "text" : "password"}
            value={form.password}
            onChange={onPasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setForm({ ...form, showPassword: !form.showPassword })
                  }
                  edge="end"
                >
                  {form.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <TextField
          label="Repeat password"
          variant="outlined"
          type="password"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.repeatPassword}
          onChange={onRepeatPasswordChange}
        />

        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => submitForm()}
        >
          Создать аккаунт
        </Button>
        <Typography className="NoAccount" variant="body1">
          Есть аккаунт?{" "}
          <Link href="/login/">
            <a>Войти</a>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
