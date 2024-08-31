import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  backgroundColor?: string;
}

export default function ButtonCom({
  onClick,
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
      onClick={onClick}
      disableElevation
      variant="contained"
    >
      {text}
    </Button>
  );
}
