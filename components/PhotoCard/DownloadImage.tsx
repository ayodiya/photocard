import Box from "@mui/material/Box";
import Image from "next/image";
import Stack from "@mui/material/Stack";

import ButtonCom from "../ButtonCom";
import imagePlaceholder from "@/public/imagePlaceholder.png";

interface DownloadImageProps {
  setStage: (stage: number) => void;
}

export default function DownloadImage({ setStage }: DownloadImageProps) {
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
        Hello! <br /> Download your image
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
          setStage={() => setStage(2)}
        />
        <ButtonCom text="Next" setStage={() => setStage(2)} />
      </Stack>
    </Box>
  );
}
