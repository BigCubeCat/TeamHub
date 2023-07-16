import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { gptStore } from "@/store/gpt";
import AddIcon from "@mui/icons-material/Add";
import { setConfig } from "@/api/suggestions";
import { useCookies } from "react-cookie";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function HelpList() {
  const helps = React.useSyncExternalStore(
    gptStore.subscribe,
    gptStore.getSnapshot,
  ).answers;
  console.log("helps = ", helps);
  const [cookies] = useCookies(["token"]);
  const [newBubble, setNewBubble] = React.useState("");

  const handleDelete = (chipToDelete: string) => () => {
    const newAnswers = helps.filter((help) => help !== chipToDelete);
    gptStore.setAnswers(newAnswers);
  };

  const handleClick = () => {
    gptStore.addHelp(newBubble);
    setNewBubble("");
    const fetchAPI = async () => {
      setConfig(cookies.token, helps);
    };
    fetchAPI().catch(console.error);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Быстрые ответы</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          flexWrap: "wrap",
          listStyle: "none",
        }}
        component="ul"
      >
        {helps.map((data) => {
          return (
            <ListItem key={data}>
              <Chip label={data} onDelete={handleDelete(data)} />
            </ListItem>
          );
        })}
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          variant="filled"
          sx={{
            width: "100%",
          }}
          value={newBubble}
          onChange={(e) => setNewBubble(e.target.value)}
        />
        <IconButton onClick={() => handleClick()}>
          <AddIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}
