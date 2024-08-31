import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect } from "react";

import ButtonCom from "../ButtonCom";
import photoCardStyles from "./styles/photocard.module.css";
import { PhotosProps } from "@/types/types";

interface WriteTextProps {
  setStage: (stage: number) => void;
  selectedPhoto: PhotosProps | "";
}

export default function WriteText({ setStage, selectedPhoto }: WriteTextProps) {
  const [nameFormState, setNameFormState] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img: HTMLImageElement = new Image();

    img.crossOrigin = "anonymous";

    const selectedImage = JSON.parse(
      localStorage.getItem("photoCardSelectedImage") || "{}",
    );
    img.src = selectedImage.imageUrl || "";

    img.onload = () => {
      if (canvas && ctx) {
        // Set canvas to original image size for high-quality download
        const aspectRatio = 4 / 5;
        // Use the original image dimensions
        let imgWidth = img.width;
        let imgHeight = img.height;

        // Adjust the image dimensions to match the new aspect ratio
        if (imgWidth / imgHeight > aspectRatio) {
          imgHeight = imgWidth / aspectRatio;
        } else {
          imgWidth = imgHeight * aspectRatio;
        }

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        // Center the image on the canvas
        const offsetX = (canvas.width - img.width) / 2;
        const offsetY = (canvas.height - img.height) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

        drawImageAndText(ctx, img, "Thank you", nameFormState);

        // Save the high-res canvas data to localStorage
        const dataURL = canvas.toDataURL("image/png");
        localStorage.setItem("photoAppCanvasDataURL", dataURL);
      }
    };
  }, [nameFormState, selectedPhoto]);

  const storeName = () =>
    localStorage.setItem("photoAppUserName", nameFormState);

  const drawImageAndText = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    topText: string,
    bottomText: string,
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(topText, ctx.canvas.width / 2, 150);
    ctx.fillText(bottomText, ctx.canvas.width / 2, ctx.canvas.height - 150);
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
        Hello! <br /> Write your name
      </Box>
      <Box
        sx={{
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <canvas
              className={`${photoCardStyles.canvasStyle}`}
              ref={canvasRef}
            ></canvas>
          </Box>
          <TextField
            label="Type your text here"
            variant="outlined"
            value={nameFormState}
            onChange={(e) => setNameFormState(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          {/* <button onClick={downloadImage} style={{ marginTop: "20px" }}>
            Download Image with Text
          </button> */}
        </Box>
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
