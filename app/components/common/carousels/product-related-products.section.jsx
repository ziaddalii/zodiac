"use client";
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {GlobalStyles} from "@mui/material";
import {useTranslation} from "react-i18next";
import SectionHeader from "@/components/common/headers/section.headers";
import "swiper/css/pagination";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/common/cards/product.card")) ;

export default function ProductRelatedProductsSection({ related_products, locale }) {

  const { t } = useTranslation();

  return (
    <div className="py-8">
      <SectionHeader title={t("fields.related-products")} />
      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        slidesPerGroupSkip={0}
        grabCursor={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 16,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
            slidesPerGroup: 4,
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper SlidesPerviewCarousel !pb-8"
      >
        <GlobalStyles
          styles={(theme) => ({
            ".swiper-button-next": {
              transition: "0.3s ease-in-out",
              opacity: "0%",
              right: "-32px",
              color: theme.palette.primary.main,
              fontSize: "16px",
            },
            ".mySwiper:hover .swiper-button-next": {
              opacity: "100%",
              right: "0px",
            },
            ".swiper-button-prev": {
              transition: "0.3s ease-in-out",
              opacity: "0%",
              left: "-32px",
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
              left: "0px",
            },
            " .swiper-pagination-bullet": {
              border: "2px solid black",
              background: "transparent",
              width: "12px",
              height: "12px",
              aspectRatio: "1",
            },
            " .swiper-pagination-bullet-active": {
              background: "black",
            },
          })}
        />
        {related_products.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <ProductCard item={product} locale={locale}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
