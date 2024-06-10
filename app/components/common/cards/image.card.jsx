// import Image from "next/image";
import { Box } from "@mui/material";

function ImageCard({ preview, base, alt }) {
  return (
    <Box className="flex h-52 justify-center w-52 relative">
      <img
        src={preview ? preview : base}
        alt={alt}
        className="h-full"
        style={{
          objectFit: "cover",
          objectPosition: "top",
          borderRadius: "100%",
        }}
      />
    </Box>
  );
}

export default ImageCard;
