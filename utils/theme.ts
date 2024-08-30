"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#3498db", // Cool Blue
    },
    secondary: {
      main: "#e67e22", // Vibrant Orange
    },
    background: {
      default: "#ecf0f1", // Light Blue for main workspace
    },
    text: {
      primary: "#2c3e50", // Dark Navy for text
      secondary: "#bdc3c7", // Soft Gray for icons, borders, etc.
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Ensure text on buttons is white for readability
        },
      },
    },
  },
});

export default theme;

// const theme = createTheme({
//   typography: {
//     fontFamily: openSans.style.fontFamily,
//   },
//   palette: {
//     primary: {
//       main: "#3498db",
//     },
//     secondary: {
//       main: "#e67e22",
//     },
//   },
// });

// export default theme;
