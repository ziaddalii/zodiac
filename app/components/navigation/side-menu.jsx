"use client";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavTabs from "./nav-tabs";
import { Button } from "@mui/material";

export default function SideMenu({navbar_data, locale}) {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSideMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (showSideMenu) {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSideMenu]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#000000] pointer-events-none z-[100] transition-all ${showSideMenu ? "opacity-70 block pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>

      <div className="lg:hidden block">
        <button aria-label="Menu icon" onClick={() => setShowSideMenu(!showSideMenu)}>
          <MenuIcon fontSize="large" />
        </button>

        <div
          ref={menuRef}
          className={`fixed overflow-auto z-[100] shadow-lg bg-white transition-all h-screen top-0 w-[19rem] ${
            showSideMenu ? "opacity-100 start-[0]" : "opacity-0 start-[-20rem]"
          }`}
        >
          <Button aria-label="Close side menu" fullWidth variant="text">
            <CloseIcon
              fontSize="large"
              onClick={() => setShowSideMenu(!showSideMenu)}
            />
          </Button>
          <NavTabs navbar_data={navbar_data} locale={locale}/>
        </div>
      </div>
    </>
  );
}
