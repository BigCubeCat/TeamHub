import React, { useState } from "react";
import { IconButton, Avatar } from "@mui/material";

export default function UploadAvatar(props: {
  defaultAvatar: string;
  callback: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [base64, setBase64] = useState<string>(props.defaultAvatar);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleChange(event) {
    const f = async () => {
      const res = await convertBase64(event.target.files[0]);
      const stringRes: string = typeof res === "string" ? res : "";
      setBase64(stringRes);
      props.callback(stringRes);
    };
    f().catch(console.error);
  }

  return (
    <IconButton
      color="secondary"
      aria-label="add an alarm"
      component="label"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <input type="file" accept=".png" onChange={handleChange} hidden />

      <Avatar src={base64} sx={{ width: 128, height: 128 }} />
    </IconButton>
  );
}
