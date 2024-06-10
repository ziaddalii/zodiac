"use client";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArticleCard from "../cards/article.card";
import { GlobalStyles } from "@mui/material";

export default function ArticlesCarousel({ articles, locale }) {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper SlidesPerviewCarousel"
      >
        <GlobalStyles
          styles={(theme) => ({
            ".swiper-button-next": {
              transition: "0.3s ease-in-out",
              opacity: "0%",
              insetInlineEnd: "-32px",
              color: theme.palette.primary.main,
              fontSize: "16px",
            },
            ".mySwiper:hover .swiper-button-next": {
              opacity: "100%",
              insetInlineEnd: "0px",
            },
            ".swiper-button-prev": {
              transition: "0.3s ease-in-out",
              opacity: "0%",
              insetInlineStart: "-32px",
              fontSize: "16px",
              color: theme.palette.primary.main,
            },
            ".swiper-button-prev:after": {
              fontSize: "32px",
            },
            ".swiper-button-next:after": {
              fontSize: "32px",
            },
            ".mySwiper:hover .swiper-button-prev": {
              opacity: "100%",
              insetInlineStart: "0px",
            },
          })}
        />
        {articles.map((article, i) => {
          return (
            <SwiperSlide key={i}>
              <ArticleCard article={article} locale={locale}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
