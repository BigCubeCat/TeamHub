import axios from "axios";
import { API_ADDRESS } from "@/utils/const";
import { TUser } from "@/types/user";

// Load user data about other user
export async function loadOtherUser(
  token: string,
  username: string,
  callback: React.Dispatch<React.SetStateAction<TUser>>,
) {
  await axios
    .get(`${API_ADDRESS}/name/users/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function(response) {
      console.log(response.data);
      callback({
        Username: response.data.username,
        Surname: response.data.surname,
        Lastname: response.data.lastname,
        Name: response.data.name,
        Avatar: response.data.avatar,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

export async function loadChat(
  token: string, text: string, chatId: string, page: number
) {
  await axios.get(`${API_ADDRESS}/message/get?chatId=${chatId}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(function(response) {
    console.log(response.data);
  })
    .catch(function(error) {
      console.log(error);
    });

};

export async function getAllChats(username: string) {
  /*
  const json = await ky.get(API_ADDRESS, { json: { username } }).json();
  return json;
  */
  const users: TChatPreviewProps[] = [
    { User: { Username: "BigCubeCat", Name: "Егор" }, Notification: true },
    { User: { Username: "Cat", Name: "Иван" }, Notification: false },
    { User: { Username: "username", Name: "Петр" }, Notification: false },
  ];
  return users;
}
