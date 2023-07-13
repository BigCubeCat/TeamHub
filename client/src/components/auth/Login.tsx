import React from "react";
import { Link, Redirect } from "wouter";
import { useCookies } from "react-cookie";

import "@style/components/Login.scss";
import { authToken, loginUser } from "@/api/auth";
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
import { TUserFormController, defaultUserForm } from "./formController";
import { TUser } from "@/types/user";
import { userStore } from "@/store/user";

export default function Login() {
  const user = React.useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );

  const [form, setForm] = React.useState<TUserFormController>(defaultUserForm);
  const [userData, setUserData] = React.useState<{
    user: TUser;
    token: string;
  }>();
  const [cookies, setCookie] = useCookies(["token"]);

  const onUsernameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newValue = e.currentTarget.value;
    setForm({ ...form, username: newValue });
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newValue = e.currentTarget.value;
    setForm({ ...form, password: newValue });
  };
  if (user.Username !== "") {
    return <Redirect to="/" />;
  }
  const submitForm = () => {
    const f = async () => {
      await loginUser(form.username, form.password, setUserData);
    };
    f().catch(console.error);
  };
  if (userData?.token) {
    setCookie("token", userData?.token, { path: "/" });
    userStore.setUser(userData.user);
  }
  if (cookies.token) {
    const f = async () => {
      await authToken(cookies.token, setUserData);
    };
    f().catch(console.error);

    // TODO get user
  }

  return (
    <Box className="LoginFormContainer">
      <Box className="LoginForm">
        <Typography className="Title">Вход</Typography>
        <TextField
          label="Ник"
          variant="outlined"
          sx={{ width: "100%", marginBottom: 5 }}
          value={form.username}
          onChange={onUsernameChange}
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
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => submitForm()}
        >
          login
        </Button>
        <Typography className="NoAccount" variant="body1">
          No account?{" "}
          <Link href="/register/">
            <a>Join!</a>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
