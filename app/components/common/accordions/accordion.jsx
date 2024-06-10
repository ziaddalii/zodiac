"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function CustomAccordion({ summary, details }) {
  const handleButtonClick = (event) => {
    event.preventDefault();
  };
  return (
    <Accordion
      sx={{
        boxShadow: "none",
        "& .MuiButtonBase-root": {
          minHeight: "0!important",
        },
        "& .MuiAccordionSummary-content": {
          margin: "0!important",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="px-3 box-content" onClick={handleButtonClick} />}
        sx={{
          p: 0,
          margin: "0",
          background: "transparent",
          border: "none",
        }}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails className="space-y-2" sx={{ padding: "8px 0" }}>
        {details}
      </AccordionDetails>
    </Accordion>
  );
}
