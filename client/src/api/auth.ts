import axios from "axios";
import React from "react";

import { API_ADDRESS } from "@/utils/const";
import { TUser } from "@/types/user";

export async function loginUser(
  username: string,
  password: string,
  callback: React.Dispatch<
    React.SetStateAction<{ user: TUser; token: string }>
  >,
) {
  await axios
    .post(
      API_ADDRESS + "/users/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then(function (response) {
      console.log(response);
      callback({
        user: {
          Username: response.data.user.username,
          Surname: response.data.user.surname,
          Lastname: response.data.user.lastname,
          Name: response.data.user.name,
        },
        token: response.data.token,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function authToken(
  token: string,
  callback: React.Dispatch<
    React.SetStateAction<{ user: TUser; token: string }>
  >,
) {
  await axios
    .get(API_ADDRESS + "/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      console.log(response);
      callback({
        user: {
          Username: response.data.user.username,
          Surname: response.data.user.surname,
          Lastname: response.data.user.lastname,
          Name: response.data.user.name,
        },
        token: response.data.token,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function registerUser(
  user: TUser,
  password: string,
  callback: React.Dispatch<React.SetStateAction<string>>,
) {
  console.log(user.Avatar);
  await axios
    .post(
      API_ADDRESS + "/users/register/",
      {
        name: user.Name,
        surname: user.Surname,
        lastname: user.Lastname,
        username: user.Username,
        password: password,
        avatar: user.Avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then(function (response) {
      callback(response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function editUser(
  name: string,
  surname: string,
  lastname: string,
  avatar: string,
  token: string,
) {
  await axios
    .patch(
      API_ADDRESS + "/users/edit/",
      {
        name,
        surname,
        lastname,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
