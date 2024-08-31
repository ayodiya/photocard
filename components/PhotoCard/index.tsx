"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import ChooseImage from "./ChooseImage";
import WriteText from "./WriteText";
import DownloadImage from "./DownloadImage";

interface RequestOptions {
  method: string;
  headers: Headers;
  redirect: RequestRedirect;
}

interface PhotosProps {
  imageUrl: string;
  altDescription: string;
}

export default function PhotoCard() {
  const [stage, setStage] = useState<number>(1);
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotosProps | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPhotos = async (): Promise<void> => {
    setLoading(true);
    const photos: PhotosProps[] = [];

    const myHeaders = new Headers();
    myHeaders.append("Accept-Version", "v1");
    myHeaders.append("Authorization", `Client-ID ${process.env.accessID}`);

    const requestOptions: RequestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.unsplashUrl}/photos/random?count=4&fit=fillmax&w=150&h=150&orientation=portrait`,
        requestOptions,
      );
      const result = await response.json();

      result.forEach((item: any) =>
        photos.push({
          imageUrl: item?.urls?.regular,
          altDescription: item?.alt_description,
        }),
      );
      setPhotos(photos);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (stage === 1) {
      fetchPhotos();
    }
  }, [stage]);

  useEffect(() => {
    const savedStage = localStorage.getItem("photoCardStage");
    if (savedStage === null) {
      localStorage.setItem("photoCardStage", "1"); // Store as a string
    } else {
      setStage(parseInt(savedStage, 10) || 1); // Convert to number
    }
  }, []);

  const handleSetStage = (newStage: number) => {
    setStage(newStage);
    localStorage.setItem("photoCardStage", newStage.toString());
  };

  return (
    <>
      {photos.length < 1 && loading && (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {photos.length < 1 && !loading && (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
          }}
        >
          No Image is available
        </Box>
      )}
      {photos.length > 0 && (
        <Box>
          {stage === 1 && (
            <ChooseImage
              setStage={handleSetStage}
              photos={photos}
              setSelectedPhoto={setSelectedPhoto}
              selectedPhoto={selectedPhoto}
            />
          )}
          {stage === 2 && (
            <WriteText
              setStage={handleSetStage}
              selectedPhoto={selectedPhoto}
            />
          )}
          {stage === 3 && <DownloadImage setStage={handleSetStage} />}
        </Box>
      )}
    </>
  );
}
