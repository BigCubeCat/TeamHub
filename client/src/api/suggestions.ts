import { gptStore } from "@/store/gpt";
import { API_ADDRESS } from "@/utils/const";
import axios from "axios";

export async function loadConfig(token: string) {
  await axios
    .get(`${API_ADDRESS}/me/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      gptStore.setAnswers(response.data.helps);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function setConfig(token: string, helps: string[]) {
  await axios
    .patch(
      `${API_ADDRESS}/me/`,
      { helps },
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
