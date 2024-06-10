"use client";
import { Button, FormControl, InputBase, styled, useTheme } from "@mui/material";
import React from "react";

export default function NewsletterForm() {
  const theme = useTheme();

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      position: "relative",
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: "#E0E3E7",
      fontSize: 16,
      width: "100%",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
    <form>
      <FormControl sx={{width:"80%"}} variant="standard">
        <div className="flex gap-2 justify-center items-center">
            <BootstrapInput placeholder="your email address"/>
            <Button sx={{padding:"10px 20px"}} variant="contained">Sign up</Button>
        </div>
      </FormControl>
    </form>
  );
}
