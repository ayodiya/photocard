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
        // Set canvas dimensions to fit aspect ratio
        const aspectRatio = 4 / 5;
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvasWidth / aspectRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Center the image and cover the entire canvas
        let imgWidth = img.width;
        let imgHeight = img.height;

        const canvasAspectRatio = canvasWidth / canvasHeight;
        if (imgWidth / imgHeight > canvasAspectRatio) {
          imgWidth = canvasWidth;
          imgHeight = imgWidth / (img.width / img.height);
        } else {
          imgHeight = canvasHeight;
          imgWidth = imgHeight * (img.width / img.height);
        }

        const offsetX = (canvasWidth - imgWidth) / 2;
        const offsetY = (canvasHeight - imgHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

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
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(topText, ctx.canvas.width / 2, 50);
    ctx.fillText(bottomText, ctx.canvas.width / 2, ctx.canvas.height - 50);
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
        <Stack
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <canvas
            className={`${photoCardStyles.canvasStyle}`}
            style={{
              border: "2px solid red",
              width: "70%", // Ensure canvas width fits desired percentage
              height: "auto", // Maintain aspect ratio
            }}
            ref={canvasRef}
          ></canvas>
          <TextField
            label="Type your text here"
            variant="outlined"
            value={nameFormState}
            onChange={(e) => setNameFormState(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
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
          onClick={() => setStage(1)}
        />
        <ButtonCom
          text="Next"
          onClick={() => {
            setStage(3);
            storeName();
          }}
        />
      </Stack>
    </Box>
  );
}
