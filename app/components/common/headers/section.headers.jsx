import React from "react";
import UnderlinedButton from "../buttons/underlined.button";

export default function SectionHeader({ title, button, link }) {
  return (
    <div className="flex justify-between items-center py-4">
      <h2 className="md:text-3xl text-xl">{title}</h2>
      {button && <UnderlinedButton link={link}>{button}</UnderlinedButton>}
    </div>
  );
}
