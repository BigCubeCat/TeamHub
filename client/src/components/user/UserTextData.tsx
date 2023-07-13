import { TUser } from "@/types/user";
import { Box, Paper, Typography } from "@mui/material";
import "@style/components/User.scss";

export default function UserTextData(props: { user: TUser }) {
  return (
    <Paper sx={{
      display: "flex", flexDirection: "column",
      border: "solid", borderRadius: 2, borderColor: "gray",
      padding: 2, marginTop: 1,
    }} onClick={() => console.log("click")}>
      <Typography variant="h5" color="black">
        {props.user.Surname} {props.user.Name} {props.user.Lastname}
      </Typography>
      <Typography variant="h6" color="secondary">
        @{props.user.Username}
      </Typography>
    </Paper>
  );
}
