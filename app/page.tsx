"use client";

import Container from "@mui/material/Container";
import { useState } from "react";

import PhotoCard from "@/components/PhotoCard";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <PhotoCard />
    </Container>
  );
}
