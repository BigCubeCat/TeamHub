import { TUser } from "@/types/user";
import { Box, Button, Typography } from "@mui/material";
import "@style/components/User.scss";

export default function UserTextData(props: { user: TUser }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h5" color="black">
        {props.user.Surname} {props.user.Name} {props.user.Lastname}
      </Typography>
      <Button sx={{ width: "100%" }} variant="contained">
        Написать
      </Button>
    </Box>
  );
}
