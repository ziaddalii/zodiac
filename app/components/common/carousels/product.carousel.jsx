"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "./product.css";
import "swiper/css/navigation";
import { useState, useEffect, useMemo } from "react";
import { GlobalStyles } from "@mui/material";
import { useProductDetails } from "@/store/product-details";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductImagesCarousel({ product }) {
  const {
    photos: slides,
    set_default_photos,
    default_photos,
  } = useProductDetails();

  const [imagesNavSlider, setImagesNavSlider] = useState(null);

  useEffect(() => {
    set_default_photos(product.photos.default);
  }, []);

  const current_slides = useMemo(() => {
    return slides.length !== 0 ? slides : default_photos;
  }, [slides, default_photos]);

  return (
    <div className="App">
      <section className="slider">
        <div className="slider__flex">
          <div className="slider__col">
            <div className="slider__thumbs">
              <Swiper
                onSwiper={setImagesNavSlider}
                direction="vertical"
                spaceBetween={24}
                slidesPerView={4}
                className="swiper-container1"
                breakpoints={{
                  0: {
                    direction: "horizontal",
                  },
                  768: {
                    direction: "vertical",
                  },
                }}
                modules={[Navigation, Thumbs]}
              >
                {current_slides.map((slide, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="slider__image">
                        <img src={slide} alt={product.name} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className="slider__images">
            <Swiper
              thumbs={{ swiper: imagesNavSlider }}
              direction="horizontal"
              slidesPerView={1}
              navigation={true}
              spaceBetween={32}
              mousewheel={true}
              className="swiper-container2"
              modules={[Navigation, Thumbs, Mousewheel]}
            >
              <GlobalStyles
                styles={(theme) => ({
                  ".swiper-button-next": {
                    transition: "0.3s ease-in-out",
                    opacity: "0%",
                    end: "-32px",
                    color: theme.palette.primary.main,
                    fontSize: "16px",
                  },
                  ".swiper-container2:hover .swiper-button-next": {
                    opacity: "100%",
                    insetInlineEnd: "16px",
                  },
                  ".swiper-button-prev": {
                    transition: "0.3s ease-in-out",
                    opacity: "0%",
                    start: "-32px",
                    fontSize: "16px",
                    color: theme.palette.primary.main,
                  },
                  ".swiper-button-prev:after": {
                    fontSize: "32px",
                  },
                  ".swiper-button-next:after": {
                    fontSize: "32px",
                    zIndex: "1",
                  },
                  ".swiper-container2:hover .swiper-button-prev": {
                    opacity: "100%",
                    insetInlineStart: "16px",
                  },
                })}
              />
              {current_slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Zoom>
                        <img
                          className="slider__image min-h-[100px]"
                          src={slide}
                          alt={product.photos.alt}
                        />
                      </Zoom>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
