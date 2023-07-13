import { IUserFound, searchUser } from "@/api/user";
import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "wouter";
import UserTextData from "../user/UserTextData";
import { TUser } from "@/types/user";


export default function UserSearch() {
  const [cookies] = useCookies(["token"]);

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

  if (cookies.token === "") {
    return <Redirect to="/" />
  }
  return (
    <Box sx={{ height: "70vh" }}>
      <Box sx={{
        display: "flex", flexDirection: "column", alignItems: 'center',
        marginBottom: 5
      }}>
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Ник" value={username} onChange={onUsernameChange} />
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Фамилия" value={surname} onChange={onSurnameChange} />
        <TextField sx={{ width: "80%", marginTop: 5 }} label="Имя" value={name} onChange={onNameChange} />
      </Box>
      <Box sx={{
        display: "flex", justifyContent: 'center',
        flexDirection: "column", marginLeft: "10%", marginRight: "10%",
        overflowY: "auto", maxHeight: "40vh"
      }}>
        {users.map(user => {
          const u: TUser = {
            Username: user.username, Name: user.name,
            Surname: user.surname, Lastname: user.lastname
          };
          return <UserTextData user={u} />
        })}
      </Box>
    </Box>
  );
}
