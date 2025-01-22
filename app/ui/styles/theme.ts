"use client";

import { createTheme } from "@mui/material/styles";
// fonts
import { roboto } from "@/app/ui/typography/fonts";

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      // eslint-disable-next-line sort-keys
      sm: 640,
      // eslint-disable-next-line sort-keys
      md: 768,
      // eslint-disable-next-line sort-keys
      lg: 1024,
      xl: 1280,
    },
  },
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
