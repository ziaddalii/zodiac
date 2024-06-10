"use client";
import { useEffect, useState } from "react";
import { useCartList } from "@/store/cart-list";
import {
  Button,
  CardActionArea,
  Container,
  Divider,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SideMenu from "@/components/navigation/side-menu";
import PopoverButton from "@/components/common/buttons/popover.buttons";
import Link from "next/link";
import NavLinkButton from "@/components/common/buttons/nav-link.buttons";
import Logo from "/public/logo-black-alt.png";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import dynamic from "next/dynamic";
import ChangeLocaleButton from "../common/buttons/change-locale.button";
import SearchButton from "./../common/buttons/search.button";

const FavoriteBadge = dynamic(
  () => import("@/components/common/badges/favorite.badge"),
  { ssr: false }
);
const CartBadge = dynamic(
  () => import("@/components/common/badges/cart.badge"),
  { ssr: false }
);
const AuthNavBarButtons = dynamic(
  () => import("@/components/navigation/auth-nav-bar"),
  { ssr: false }
);

export default function NavBar({ navbar_data, locale }) {
  const { t } = useTranslation();

  const { get_count: get_cart_count, toggle_cart } = useCartList();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <header
        className={`border-b-1 z-[200] border-b border-b-secondary transition-all sticky w-full !bg-white ${visible ? "top-0" : "-top-52"} `}
      >
        <Container maxWidth="xxl">
          <nav className="flex gap-4 flex-nowrap h-20 items-center justify-between">
            {/* Side Bar */}
            <SideMenu navbar_data={navbar_data} locale={locale} />

            {/* Routes */}
            <div className="justify-start gap-4 lg:grow lg:flex-1 lg:flex-shrink-0 lg:flex hidden">
              {/* Single State */}
              <ul className="lg:flex hidden p-0 gap-4 w-full">
                {navbar_data.super_categories.map((super_category, i) => (
                  <li key={i} className="relative">
                    <PopoverButton
                      center={true}
                      key={super_category.id}
                      trigger={super_category.names[locale]}
                      super_category_name={super_category.names.en}
                    >
                      <div className="relative flex p-0 w-[50rem]">
                        <div className="w-1/3">
                          {super_category.categories.map((category, i) => {
                            return (
                              <MenuItem
                                onMouseEnter={() => {
                                  setIndex(i);
                                }}
                                key={category.id}
                                background="primary"
                                className="group bg-white"
                                sx={{
                                  fontSize: "20px",
                                  maxHeight: "fit-content",
                                  minHeight: "30rem",
                                  padding: "0",
                                  width: "100%",
                                }}
                              >
                                <Link
                                  href={`/categories/${category.id}?page=1`}
                                  className={`${i === index ? "bg-white !text-black" : "bg-primary text-white"} w-full flex h-fit p-4 text-white bg-[#333] transition-all group-hover:bg-white group-hover:text-[#333] justify-between items-center`}
                                >
                                  <div className="flex flex-wrap row justify-between items-center w-full">
                                    <div className="col-span-1 flex gap-2 items-center">
                                      <Image
                                        className="rounded-full aspect-square object-cover bg-white"
                                        width={52}
                                        height={52}
                                        alt={category.photos.alt}
                                        src={category.photos.lg}
                                      />
                                      <p className="capitalize text-base">
                                        {category.names[locale]}
                                      </p>
                                    </div>
                                    {locale === "en" ? (
                                      <ArrowForwardIosIcon
                                        sx={{ fontSize: "12px" }}
                                      />
                                    ) : (
                                      <ArrowBackIosIcon
                                        sx={{ fontSize: "12px" }}
                                      />
                                    )}
                                  </div>
                                </Link>
                              </MenuItem>
                            );
                          })}
                        </div>
                        <div className="absolute p-4 grid justify-between w-2/3 gap-4 grid-cols-2 top-0 start-1/3">
                          {super_category.categories[index] &&
                            super_category.categories[index].sub_categories.map(
                              (sub_category) => {
                                return (
                                  <Link
                                    href={`/categories/${super_category.categories[index].id}/${sub_category.id}?page=1`}
                                    className="col-span-1 text-SecondaryText hover:underline capitalize"
                                    key={sub_category.id}
                                  >
                                    {sub_category.names[locale]}
                                  </Link>
                                );
                              }
                            )}
                        </div>{" "}
                      </div>
                    </PopoverButton>
                  </li>
                ))}

                <NavLinkButton
                  name={t("fields.all-categories")}
                  route={"/categories"}
                />
              </ul>
            </div>

            {/* Logo */}
              <Button TouchRippleProps={false} component={Link} href="/" className="grow-0">
                <Image src={Logo} alt="Zodiac Logo" className="w-40" priority />
              </Button>

            {/*Faq / Contact*/}
            {/* Login/Register/Favorites/CartSidebar/Search */}
            <div className="flex lg:grow gap-4 h-full items-center justify-end lg:flex-1 lg:flex-shrink-0">
              {/*Faq / Contact*/}
              <div className="lg:flex hidden gap-4">
                <NavLinkButton
                  name={t("navigation.branches")}
                  route="/branches"
                />

                {/*<NavLinkButton name={t("navigation.contact-us")} route="/contact"/>*/}
              </div>

              <Divider
                className="lg:block hidden"
                orientation="vertical"
                variant="fullWidth"
                flexItem
              />

              <div className="flex items-center gap-4">
                <div className="md:block hidden">
                  <AuthNavBarButtons />
                </div>
                <SearchButton />

                <Link
                  data-aos-delay={100}
                  data-aos="fade-up"
                  className="md:block hidden"
                  href="/auth/account/wishlist"
                >
                  <div className="min-w-6 min-h-6">
                    <FavoriteBadge />
                  </div>
                </Link>

                <Button
                  data-aos-delay={100}
                  data-aos="fade-up"
                  className="lg:!block !hidden"
                  type="button"
                  sx={{ p: 0, minWidth: 0 }}
                  disableRipple
                  style={{ background: "transparent" }}
                  variant="text"
                  onClick={() => toggle_cart(true)}
                >
                  <div className="min-w-6 min-h-6">
                    <CartBadge />
                  </div>
                </Button>

                <ChangeLocaleButton locale={locale} />
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}
