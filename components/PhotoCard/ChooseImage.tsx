import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

import imagePlaceholder from "@/public/imagePlaceholder.png";
import imageLoader from "@/utils/imageLoader";
import ButtonCom from "../ButtonCom";
import { PhotosProps } from "@/types/types";

interface ChooseImageProps {
  setStage: (stage: number) => void;
  photos: PhotosProps[];
  selectedPhoto: PhotosProps | "";
  setSelectedPhoto: (photo: PhotosProps) => void;
}

export default function ChooseImage({
  setStage,
  photos,
  selectedPhoto,
  setSelectedPhoto,
}: ChooseImageProps) {
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
          {Array.isArray(photos) &&
            photos.map(
              ({
                imageUrl,
                altDescription,
              }: {
                imageUrl: string;
                altDescription: string;
              }) => (
                <Grid
                  onClick={() => setSelectedPhoto({ imageUrl, altDescription })}
                  sx={{
                    border:
                      selectedPhoto &&
                      selectedPhoto.imageUrl === imageUrl &&
                      selectedPhoto.altDescription === altDescription
                        ? "2px solid #e67e22"
                        : "none",
                  }}
                  key={altDescription}
                  size={{ xs: 12, md: 3 }}
                >
                  <Image
                    loader={() => imageLoader({ src: imageUrl })}
                    src={imagePlaceholder}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={altDescription}
                  />
                </Grid>
              ),
            )}
        </Grid>
      </Box>
      <Box
        sx={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonCom
          text="Next"
          setStage={() => {
            localStorage.setItem(
              "photoCardSelectedImage",
              JSON.stringify(selectedPhoto || ""),
            );
            setStage(2);
          }}
        />
      </Box>
    </Box>
  );
}
