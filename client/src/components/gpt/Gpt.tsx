import "@/style/base.scss";
import HelpBubble from "./HelpBubble";

import { Box } from "@mui/material";
import { useSyncExternalStore } from "react";
import { gptStore } from "@/store/gpt";

export default function Gpt() {
  const helps = useSyncExternalStore(gptStore.subscribe, gptStore.getSnapshot);
  return (
    <Box className="GptList">
      {helps.answers.map((help) => (
        <HelpBubble help={help} />
      ))}
    </Box>
  );
}
