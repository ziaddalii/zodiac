import {Button} from "@mui/material";
import {Link} from "next/link";

export default function UnderlinedButton({ children, link, ...props }) {
  return link ? (
    <Button
        {...props}
      component={Link}
      href={link}
      sx={{ p: 0 }}
      variant="text"
      className="items-center relative hover:opacity-75 md:text-base text-xs transition-all after:absolute after:bottom-0 after:left-0 after:bg-primary after:w-[100%] after:h-[2px] after:transition-all"
    >
      {children}
    </Button>
  ) : (
    <Button
        {...props}
      sx={{ p: 0 }}
      variant="text"
      className="items-center relative hover:opacity-75 md:text-base text-xs transition-all after:absolute after:bottom-0 after:left-0 after:bg-primary after:w-[100%] after:h-[2px] after:transition-all"
    >
      {children}
    </Button>
  );
}
