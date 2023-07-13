import { loadOtherUser } from "@/api/chats";
import UserAvatar from "@/components/user/UserAvatar";
import { TUser } from "@/types/user";

import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function UserPage(props: { username: string }) {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState<TUser>({
    Username: "",
    Name: "",
    Surname: "",
    Lastname: "",
    Avatar: "",
  });
  const loading = user.Username === "";
  const skeleton = (
    <Skeleton
      animation="wave"
      height={30}
      width={250}
      style={{ marginLeft: 10 }}
    />
  );

  useEffect(() => {
    const fetchAPI = async () => {
      await loadOtherUser(cookies.token, props.username, setUser);
    };
    fetchAPI().catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: 500, maxHeight: 500 }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <UserAvatar user={user} />
          )}
          <Box
            sx={{
              height: 100,
              minWidth: 250,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {loading ? (
              skeleton
            ) : (
              <Typography variant="h3" color="primary">
                {user.Username}
              </Typography>
            )}
            {loading ? (
              skeleton
            ) : (
              <Typography variant="h5" color="black">
                {user.Surname} {user.Name} {user.Lastname}
              </Typography>
            )}
          </Box>
        </Box>
        <Button sx={{ width: "100%", marginTop: 10 }} variant="outlined">
          Написать
        </Button>
      </Box>
    </Box>
  );
}
