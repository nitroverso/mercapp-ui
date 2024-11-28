"use client";

import { createTheme } from "@mui/material/styles";
// fonts
import { roboto } from "@/app/ui/typography/fonts";

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
