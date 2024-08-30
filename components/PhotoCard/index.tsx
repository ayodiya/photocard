"use client";

import { useState, useEffect } from "react";

import ChooseImage from "./ChooseImage";
import WriteText from "./WriteText";
import DownloadImage from "./DownloadImage";

export default function PhotoCard() {
  const [stage, setStage] = useState<string>(
    localStorage.getItem("photoCardStage") || "1",
  );

  useEffect(() => {
    if (localStorage.getItem("photoCardStage") === null) {
      localStorage.setItem("photoCardStage", "1");
    } else {
      setStage(localStorage.getItem("photoCardStage") || "1");
    }
  }, []);

  const handleSetStage = (newStage: number) => {
    const stageString = newStage.toString();
    setStage(stageString);
    localStorage.setItem("photoCardStage", stageString);
  };

  return (
    <>
      {stage === "1" && <ChooseImage setStage={handleSetStage} />}
      {stage === "2" && <WriteText setStage={handleSetStage} />}
      {stage === "3" && <DownloadImage setStage={handleSetStage} />}
    </>
  );
}
