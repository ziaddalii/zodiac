"use client";
import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Navigation} from "swiper/modules";
import {Container, GlobalStyles} from "@mui/material";

import { Parallax } from "react-parallax";

export default function BannerCarousel({ locale, banners }) {
  return (
    <Container maxWidth="xl">
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
        loop={banners.length > 0}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <GlobalStyles
          styles={(theme) => ({
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
              width:"fit-content!important",
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
        {banners.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
                <article className="bg-white">
                  <div className="relative">
                  <Parallax bgImageStyle={{top:"0", objectFit:"cover"}} bgImageAlt={banner.photos.alt} bgImage={banner.photos.lg[locale]} strength={-200}>
                  <div style={{ height: 280 }}>
                    <article className="space-y-4 absolute bottom-4 start-4">
                      <h2 className="text-xl">
                        {banner.titles[locale]}
                      </h2>
                      <p className="text-SecondaryText pe-4">
                        {banner.descriptions[locale]}
                      </p>
                    </article>
                  </div>
                </Parallax>

                  </div>
                </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}
