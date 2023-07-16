import React from "react";
import { API_ADDRESS } from "@/utils/const";
import axios from "axios";

interface IUserSearch {
  username: string;
  name: string;
  surname: string;
}

export interface IUserFound {
  username: string;
  name: string;
  surname: string;
  lastname: string;
}

export async function searchUser(token: string, query: IUserSearch,
  callback: React.Dispatch<React.SetStateAction<IUserFound[]>>) {
  await axios.get(
    `${API_ADDRESS}/users/search?username=${query.username}&name=${query.name}&surname=${query.surname}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  ).then(function(response) {
    callback(response.data.users);
  }).catch(function(error) {
    console.log(error);
  });
}
