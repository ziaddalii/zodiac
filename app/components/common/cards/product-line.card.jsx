import React from "react";
import {
  create_slug,
  format_price,
  random_int_between,
} from "../../../../util/common";

import { ButtonGroup, Divider } from "@mui/material";
import Link from "next/link";
import QuickViewButton from "../buttons/quick-view.buttons";
import getTranslations from "@/i18n-next";
import FavoriteButton from "../buttons/favorite.buttons";
import CompareButton from "../buttons/compare.buttons";
import ProductAddToCart from "../buttons/product-add-to-cart";

export default async function ProductCardLine({ item, locale }) {
  const { t } = await getTranslations(locale);

  const random_colors_index = random_int_between(0, item.photos.colors.length);

  const random_photos_index = random_int_between(
    0,
    item.photos.colors[random_colors_index].photos.length
  );

  return (
    <div
      id="product-hover-group"
      className="group w-full gap-4 items-center grid md:grid-cols-4 grid-cols-2"
    >
      <Link
        className="col-span-1"
        href={`/products/${item.id}/${create_slug(item.names.en)}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden col-span-1">
          {item.photos.colors[random_colors_index] &&
          item.photos.colors[random_colors_index].photos[
            random_photos_index
          ] ? (
            <>
              <img
                alt={item.photos.alt}
                src={item.photos.card}
                className="aspect-[4/5] h-full w-full object-cover group-hover:opacity-0 opacity-100 transition-all"
              />
              <img
                alt={item.photos.alt}
                src={
                  item.photos.colors[random_colors_index].photos[
                    random_photos_index
                  ]
                }
                className="aspect-[4/5] h-full w-full object-cover absolute top-0 start-0 group-hover:opacity-100 duration-700 ease-out opacity-0 group-hover:scale-110 scale-100 transition-all"
              />
            </>
          ) : (
            <img
              alt={item.photos.alt}
              src={item.photos.card}
              className="aspect-[4/5]"
            />
          )}

          <ButtonGroup
            className="absolute group-hover:end-4 -end-10 top-4 transition-all duration-[450ms]"
            variant="contained"
            orientation="vertical"
            aria-label="vertical text button group"
          >
            {/*Compare*/}
            <CompareButton product_id={item.id} />

            {/*Quick View*/}
            <QuickViewButton product={item} />

            {/*Favorite*/}
            <FavoriteButton product_id={item.id} />
          </ButtonGroup>

          {/*Discount => Discount*/}
          {item.prices.discount > 0 && (
            <div className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-primary flex justify-center items-center text-white">
              -{item.prices.percent}%
            </div>
          )}

          {/*New and No Discount => New*/}
          {item.stats.is_new && item.prices.discount === 0 && (
            <div className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-green-700 flex justify-center items-center text-white">
              {t("fields.new")}
            </div>
          )}
        </div>
      </Link>

      <div className="md:col-span-3 col-span-1 space-y-2">
        {/* Name */}
        <h2 className="text-xl">{item.names[locale]}</h2>

        {/* Category */}
        <p className="text-SecondaryText">{item.category.names[locale]}</p>

        {/*Price */}
        <div className="flex items-center gap-4">
          {item.prices.discount !== 0 ? (
            <>
              <p className="!text-SecondaryText font-thin text-xl line-through">
                {t("fields.egp")} {format_price(item.prices.normal)}
              </p>
              <p className="text-xl text-red-700">
                {t("fields.egp")} {format_price(item.prices.discount)}
              </p>
            </>
          ) : (
            <p className="text-xl">
              {t("fields.egp")} {format_price(item.prices.normal)}
            </p>
          )}
        </div>

        {/*Colors */}
        <div className="flex flex-wrap gap-2 items-center">
          {item.photos.colors.map((color) => {
              return (
                <div
                  className="size-5 aspect-square rounded-full border border-secondary"
                  key={color.id}
                  style={{ backgroundColor: color.color.hex }}
                ></div>
              );
          })}
        </div>
        <span className="text-sm text-SecondaryText text-ellipsis line-clamp-3">
          {item.descriptions[locale]}
        </span>
        {/* Add To Cart Button */}
        <div>
          <ProductAddToCart product={item} />
        </div>
      </div>
      <Divider className="mt-4" />
    </div>
  );
}
