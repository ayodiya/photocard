import type { Metadata } from "next";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../utils/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo card app",
  description: "A simple photo card app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                fontFamily: "Open sans",
                minHeight: "100vh",
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
