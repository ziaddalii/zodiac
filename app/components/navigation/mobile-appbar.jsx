"use client";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "react-i18next";
import { useCartList } from "@/store/cart-list";
import dynamic from "next/dynamic";
import { is_authenticated } from "../../../api/cookies.api";
import {useEffect, useState} from "react";
const FavoriteBadge = dynamic(
    () => import("@/components/common/badges/favorite.badge"),
    { ssr: false }
  );
  const CartBadge = dynamic(
    () => import("@/components/common/badges/cart.badge"),
    { ssr: false }
  );

export default function MobileAppbar() {
  const { t } = useTranslation();
  const { get_count: get_cart_count, toggle_cart } = useCartList();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
      const handleScroll = () => {
          const currentScrollPos = window.scrollY;

          if (currentScrollPos > prevScrollPos) {
              setVisible(false);
          } else {
              setVisible(true);
          }

          setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  return (
    <Box className={`fixed w-full z-[100] transition-all md:hidden border-t-1 border-t ${
        visible ? "bottom-[0px]" : "-bottom-[150px]"}`}>
      <BottomNavigation
        className="!divide-x-2 !divide-black"
        showLabels
        sx={{
          borderTop: "1px solid #e6e6e6",
          height:"65px",
        }}
      >
        {/*Home*/}
        <BottomNavigationAction
          component={"a"}
          sx={{
            fontSize: "10px",
            padding: "0",
color:"black",            minWidth: "0",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "10px",
            },
          }}
          href="/"
          label={t("fields.home")}
          icon={<HomeIcon />}
        />

        {/*Cart*/}
        <BottomNavigationAction
        onClick={() => toggle_cart(true)}

          sx={{
            fontSize: "10px",
            padding: "0",
color:"black",            minWidth: "0",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "10px",
            },
          }}
          label={t("fields.cart")}
          icon={<div className="min-w-6 min-h-6"><CartBadge data-aos-delay={100}
          data-aos="fade-up"/></div>}
          />
        {/*Wishlist*/}
        <BottomNavigationAction
        component="a"
          sx={{
            fontSize: "10px",
            padding: "0",
color:"black",            minWidth: "0",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "10px",
            },
          }}
          label={t("fields.wishlist")}
          href="/auth/account/wishlist"
          icon={<div className="min-w-6 min-h-6"><FavoriteBadge data-aos-delay={100}
          data-aos="fade-up"/></div>}
        />

        {is_authenticated() && (
          <BottomNavigationAction
            component={"a"}
            sx={{
              fontSize: "10px",
              padding: "0",
color:"black",              minWidth: "0",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "10px",
              },
            }}
            href="/auth/account/profile"
            label={t("fields.my-account")}
            icon={<PersonIcon />}
          />
        )}

        {!is_authenticated() && (
          <BottomNavigationAction
            component={"a"}
            sx={{
              fontSize: "10px",
              padding: "0",
color:"black",              minWidth: "0",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "10px",
              },
            }}
            href="/auth/login"
            label={t("fields.login")}
            icon={<LoginIcon />}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
