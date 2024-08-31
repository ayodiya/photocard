import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  setStage: MouseEventHandler<HTMLButtonElement>;
  backgroundColor?: string;
}

export default function ButtonCom({
  setStage,
  text,
  backgroundColor,
}: ButtonProps) {
  return (
    <Button
      sx={{
        width: "200px",
        backgroundColor: backgroundColor,
        "&:hover": {
          backgroundColor: backgroundColor,
        },
      }}
      onClick={setStage}
      disableElevation
      variant="contained"
    >
      {text}
    </Button>
  );
}
