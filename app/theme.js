"use client";

import {Cairo} from "next/font/google";
import {createTheme} from "@mui/material/styles";

const cairo = Cairo({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const build_theme = (direction = "ltr") => createTheme({
  direction,
  palette: {
    mode: "light",
    primary: { main: "#242424", dark: "#1A1A1A", light: "#2B2B2B" },
    secondary: { main: "#E9E9E9" },
    text: {
      primary: "#0A0A0A",
     secondary: "#777777",
      disabled: "#BBBBBB",
    },
    accent: {
      main: "#ffd762",
    },
  },
  typography: {
    fontFamily: cairo.style.fontFamily,
  },
  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiInputLabel-root": {
    //         insetInlineStart:"0!important",
    //         maxWidth:"fit-content",
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderWidth: "2px",
            color: "inherit",
            "&:hover": {
              color: "inherit",
              borderWidth: "2px",
            },
          },
        },
      ],
      defaultProps: {
        variant: "text",
      },
      styleOverrides: {
        root: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
