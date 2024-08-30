import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

import imagePlaceholder from "@/public/imagePlaceholder.png";
import ButtonCom from "../ButtonCom";

interface ChooseImageProps {
  setStage: (stage: number) => void;
}

export default function ChooseImage({ setStage }: ChooseImageProps) {
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
        Hello! <br /> Choose an image to customise
      </Box>
      <Box
        sx={{
          paddingTop: "50px",
        }}
      >
        <Grid spacing={2} container>
          {[1, 2, 3, 4].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 3 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                src={imagePlaceholder}
                alt="image"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonCom text="Next" setStage={() => setStage(2)} />
      </Box>
    </Box>
  );
}
