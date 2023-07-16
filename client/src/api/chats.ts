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
  token: string, chatId: string, page: number
) {
  await axios.get(`${API_ADDRESS}/message/get?chatId=${chatId}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(function(response) {
    console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}

export async function sendMessage(token: string, chatId: string, text: string) {
  await axios.post(`${API_ADDRESS}/message/new`, {
    text, chatId
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}
