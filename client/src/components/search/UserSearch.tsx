import { IUserFound, searchUser } from "@/api/user";
import { Box, TextField, Paper, Typography } from "@mui/material";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "wouter";
import UserTextData from "../user/UserTextData";
import { TUser } from "@/types/user";
import { gptStore } from "@/store/gpt";
import { joinUsernames } from "@/utils/chat";
import { userStore } from "@/store/user";


export default function UserSearch(props: { single: boolean, handleClose: () => void }) {
  const [cookies] = useCookies(["token"]);
  const self = useSyncExternalStore(userStore.subscribe, userStore.getSnapshot);

  const [clicked, setClicked] = useState<boolean>(false);

  const [users, setUsers] = useState<IUserFound[]>([]);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const onUsernameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onSurnameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      await searchUser(cookies.token, { username, name, surname }, setUsers);
    };
    fetchSearch().catch(console.error);
  }, [username, name, surname]);

  if (clicked) {
    return <Redirect to="/" />
  }
  if (cookies.token === "") {
    return <Redirect to="/login/" />
  }

  const selectUser = (User: TUser) => {
    if (props.single) {
      gptStore.addChat({ User: User, Notification: false, ChatId: joinUsernames([User.Username, self.Username]) });
      props.handleClose();
    }
  };
  return (
    <Paper sx={{ height: "70vh" }}>
      <Box sx={{
        display: "flex", flexDirection: "column", alignItems: 'center',
        marginBottom: 5
      }}>
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Ник" value={username} onChange={onUsernameChange} />
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Фамилия" value={surname} onChange={onSurnameChange} />
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Имя" value={name} onChange={onNameChange} />
      </Box>
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 1 }}>
        Результаты поиска
      </Typography>

      <Box sx={{
        display: "flex",
        marginLeft: "30%",
        overflowY: "auto", maxHeight: "40vh"
      }}>
        {users.map(user => {
          const u: TUser = {
            Username: user.username, Name: user.name,
            Surname: user.surname, Lastname: user.lastname
          };
          return <Paper sx={{ marginRight: 5 }} onClick={() => selectUser(u)}><UserTextData user={u} /></Paper>
        })}
      </Box>
    </Paper>
  );
}
