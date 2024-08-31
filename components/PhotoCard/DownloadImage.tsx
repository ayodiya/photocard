import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

import ButtonCom from "../ButtonCom";

interface DownloadImageProps {
  setStage: (stage: number) => void;
}

export default function DownloadImage({ setStage }: DownloadImageProps) {
  const [downloadableImage, setDownloadImage] = useState<string | null>(null);

  useEffect(() => {
    const imageURL = localStorage.getItem("photoAppCanvasDataURL");

    if (imageURL) {
      setDownloadImage(imageURL);
    }
  }, []);

  const downloadImage = () => {
    if (downloadableImage) {
      const link = document.createElement("a");
      link.href = downloadableImage;
      link.download = "custom-image.png";
      link.click();
    }
  };

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
            {downloadableImage ? (
              <img
                src={downloadableImage}
                style={{ width: "100%", height: "100%" }}
                alt="image"
              />
            ) : (
              <p>No image available for download</p>
            )}
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
          onClick={() => setStage(2)}
        />
        <ButtonCom
          text="Download Image"
          onClick={() => {
            downloadImage();
            setStage(1);
          }}
        />
      </Stack>
    </Box>
  );
}
