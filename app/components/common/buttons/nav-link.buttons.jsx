import Link from "next/link";
import React from "react";

export default function NavLinkButton({ name, route }) {
  return (
      <Link
        href={route}
        className="flex items-center group relative hover:opacity-75 transition-all after:absolute after:-bottom-1 after:left-0 after:bg-primary after:w-[0%] hover:after:w-[100%] after:h-[2px] after:transition-all"
      >
        {name}
      </Link>
  );
}
