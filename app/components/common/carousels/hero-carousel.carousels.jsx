"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { isEmpty } from "lodash-es";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button, GlobalStyles } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function HeroCarousel({ locale, slides }) {
  const { t } = useTranslation();

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 0}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <GlobalStyles
          styles={(theme) => ({
            ".swiper-horizontal .swiper-pagination-horizontal": {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              top: "50%",
              insetInlineStart: "1rem",
              transform: "translate(0%, -50%)",
              height: "fit-content",
            },
            ".arrow-right": {
              top: "0",
              insetInlineEnd: "0px",
            },
            ".arrow-left": {
              top: "0",
              insetInlineEnd: "100px",
            },
            ".swiper-pagination-bullet.swiper-pagination-bullet-active": {
              background: "black",
              border: "white solid 4px!important",
              outline: "2px solid",
              opacity: "100%",
            },
            ".swiper-pagination-bullets.swiper-pagination": {
              width: "fit-content!important",
            },
            ".swiper-pagination-bullet": {
              background: "white",
              padding: "0px",
              transitionProperty: "all",
              transitionDuration: "300ms",
              border: "0px solid white",
              outline: "2px solid",
              opacity: "40%",
              height: "14px",
              width: "14px",
            },
            ".swiper-pagination-bullet:hover": {
              background: "black",
              border: "4px solid white",
              opacity: "100%",
            },
          })}
        />
        {slides.map((slide, index) => {
          return (
            <SwiperSlide
              key={`h-carousel-slide-${index}-${slide.main.id}-${slide.sub.id ?? "-"}`}
            >
              {({ isActive }) => (
                <article className="bg-[white] sm:h-[80vh] h-[50vh] min-h-[520px]">
                  <div className="relative flex h-full flex-1">
                    <div className="lg:w-2/6 h-full sm:w-1/2 w-2/3 p-0 overflow-hidden">
                      <img
                        className={`w-full h-full transition-all ease-in-out duration-[1000ms] object-cover ${
                          isActive
                            ? "scale-100 opacity-[100%]"
                            : "scale-150 opacity-[0%]"
                        }`}
                        src={slide.main.photos.lg[locale]}
                        alt={slide.main.photos.alt}
                      />
                    </div>
                    <div className="relative lg:w-2/6 sm:1/2 w-1/3">
                      <div
                        className={`absolute transition-all w-full bottom-0 ease-in-out duration-[1500ms] ${
                          isActive
                            ? "lg:-start-[6%] -start-[10%] opacity-[100%]"
                            : "start-[40%] opacity-[0%]"
                        } text-black -translate-y-1/2 lg:text-6xl md:text-5xl text-xl`}
                      >
                        <div
                          className={`transition-all h-[1px] lg:w-40 w-20 bg-[black] ease-in-out duration-[2000ms] lg:mb-8 mb-4 ${
                            isActive
                              ? "ms-[0px] opacity-[100%]"
                              : "ms-[80px] opacity-[0%]"
                          }`}
                        ></div>
                        <p
                          className={`transition-all capitalize font-thin lg:w-[80%] w-full ease-in-out duration-[2500ms] ${
                            isActive
                              ? "ms-[0px] opacity-[100%]"
                              : "ms-[80px] opacity-[0%]"
                          }`}
                        >
                          {slide.main.titles[locale]}
                        </p>
                        <div
                          className={`transition-all ease-in-out duration-[3000ms] ${
                            isActive
                              ? "ms-[0px] opacity-[100%]"
                              : "ms-[100px] opacity-[0%]"
                          }`}
                        >
                          {!isEmpty(slide.main.ref ?? slide.sub.ref ?? "") && (
                            <Button
                              component={Link}
                              href={slide.main.ref ?? slide.sub.ref ?? ""}
                              sx={{ p: 0}}
                              variant="text"
                              className="items-center text-nowrap relative hover:opacity-75 md:text-base text-xs transition-all after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[100%] after:h-[2px] after:transition-all"
                            >
                              {t("fields.shop-now")}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-2/6 lg:flex hidden justify-center items-center pe-40 pb-32 pt-16 ps-0 overflow-hidden">
                      <img
                        className={`w-full object-contain h-full transition-all ease-in duration-[1200ms] ${
                          isActive
                            ? "ms-[0px] opacity-[100%]"
                            : "ms-[100px] opacity-[0%]"
                        }`}
                        src={slide.sub.photos.lg[locale]}
                        alt={slide.sub.photos.alt}
                      />
                    </div>
                  </div>
                </article>
              )}
            </SwiperSlide>
          );
        })}

        <div className="lg:block hidden gap-8 lg:pe-40 pe-4 absolute bottom-12 w-full">
          <div className="relative">
            <button className="arrow-left z-10 arrow absolute">
              {locale === "ar" ? (
                <EastIcon fontSize="large" />
              ) : (
                <WestIcon fontSize="large" />
              )}
            </button>
            <button className="arrow-right z-10 arrow absolute">
              {locale === "ar" ? (
                <WestIcon fontSize="large" />
              ) : (
                <EastIcon fontSize="large" />
              )}{" "}
            </button>
          </div>
        </div>
      </Swiper>
    </>
  );
}
