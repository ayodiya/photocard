import Box from "@mui/material/Box";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import ButtonCom from "../ButtonCom";
import imagePlaceholder from "@/public/imagePlaceholder.png";

interface WriteTextProps {
  setStage: (stage: number) => void;
}

export default function WriteText({ setStage }: WriteTextProps) {
  const [nameFormState, setNameFormState] = useState<string>("");

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameFormState(e.target.value);

  const storeName = () =>
    localStorage.setItem("photoAppUserName", nameFormState);

  return (
    <Box>
      <Box
        sx={{
          paddingTop: "50px",
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Hello! <br /> Write your name
      </Box>
      <Box
        sx={{
          paddingTop: "20px",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "30px",
          }}
        >
          <TextField
            onChange={handleNameInput}
            label="Write your name"
            variant="outlined"
            value={nameFormState}
          />
          <Box
            sx={{
              width: { xs: "50%", md: "30%" },
            }}
          >
            <Image
              src={imagePlaceholder}
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </Box>
        </Stack>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingTop: "30px",
        }}
      >
        <ButtonCom
          backgroundColor="secondary.main"
          text="Previous"
          setStage={() => setStage(1)}
        />
        <ButtonCom
          text="Next"
          setStage={() => {
            setStage(3);
            storeName();
          }}
        />
      </Stack>
    </Box>
  );
}
