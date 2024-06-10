"use client";
import {InputBase, InputLabel} from "@mui/material";
import React from "react";
import styled from "styled-components";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: 1,
    fontSize: 24,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    borderRadius: 0,
    position: "relative",
    border: "1px solid",
    // border:`${props.error ? "1px solid red" : "1px solid"}`,
    borderColor: "#E9E9E9",
    marginTop: 4,
    fontSize: 16,
    padding: "10px 12px",

    "&:focus": {
      borderColor: "#242424",
    },
  },
}));
const BaseTextFieldInputs = React.forwardRef((props, ref) => {
  return (
    <div>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input {...props} inputRef={ref} />
      <p
        className={`text-red-600 text-sm ${props.error ? "opacity-100" : "opacity-0"}`}
      >
        {props.helpertext ? props.helpertext : " ."}
      </p>
    </div>
  );
});

export default BaseTextFieldInputs;
