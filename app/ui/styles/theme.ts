"use client";

import { createTheme } from "@mui/material/styles";
// fonts
import { roboto } from "@/app/ui/typography/fonts";

const lightTheme = createTheme({
  palette: {
    error: {
      main: "#d32f2f",
    },
    mode: "light",
    primary: {
      main: "#F78730",
    },
    secondary: {
      main: "#30a1f7",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#ed6c02",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default lightTheme;
