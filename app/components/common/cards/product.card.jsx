import { ButtonGroup, CardActionArea } from "@mui/material";
import {
  create_slug,
  format_price,
  random_int_between,
} from "../../../../util/common";
import UnderlinedProductAddToCart from "../buttons/underlined-add-to-cart.buttons";
import getTranslations from "@/i18n-next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const CompareButton = dynamic(
  () => import("@/components/common/buttons/compare.buttons"),
  { ssr: false }
);

const FavoriteButton = dynamic(
  () => import("@/components/common/buttons/favorite.buttons"),
  { ssr: false }
);

const QuickViewButton = dynamic(
  () => import("@/components/common/buttons/quick-view.buttons"),
  { ssr: false }
);

export default async function ProductCard({ item, locale }) {
  const { t } = await getTranslations(locale);

  const random_colors_index = random_int_between(0, item.photos.colors.length);

  const random_photos_index = random_int_between(
    0,
    item.photos.colors[random_colors_index].photos.length
  );

  return (
    <div id="product-hover-group" className="col-span-1 group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <CardActionArea>
          <Link href={`/products/${item.id}/${create_slug(item.names.en)}`}>
            {item.photos.colors[random_colors_index] &&
            item.photos.colors[random_colors_index].photos[
              random_photos_index
            ] ? (
              <>
                <Image
                  height={1000}
                  width={1000}
                  alt={item.photos.alt || "product-card"}
                  src={item.photos.card}
                  className="aspect-[4/5] h-full w-full object-cover group-hover:opacity-0 opacity-100 transition-all"
                />
                <Image
                  height={1000}
                  width={1000}
                  alt={item.photos.alt || "product-alt-card"}
                  src={
                    item.photos.colors[random_colors_index].photos[
                      random_photos_index
                    ]
                  }
                  className="aspect-[4/5] h-full w-full object-cover absolute top-0 start-0 group-hover:opacity-100 duration-700 ease-out opacity-0 group-hover:scale-110 scale-100 transition-all"
                />
              </>
            ) : (
              <Image
                height={1000}
                width={1000}
                alt={item.photos.alt || "product-card"}
                src={item.photos.card}
                className="aspect-[4/5]"
              />
            )}
          </Link>
        </CardActionArea>

        {/*Buttons*/}
        <ButtonGroup
          id="product-buttons-group"
          className="absolute group-hover:end-4 -end-12 top-4 transition-all duration-[450ms]"
          variant="contained"
          orientation="vertical"
          aria-label="vertical text button group"
        >
          {/*Compare*/}
          <CompareButton product_id={item.id} />

          {/*Quick View*/}
          <QuickViewButton product={item} locale={locale} />

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

      {/* Name */}
      <h2>{item.names[locale]}</h2>

      {/* Category - Sub Category */}
      <p className="text-SecondaryText">{`${item.category.names[locale]} - ${item.sub_category.names[locale]}`}</p>

      {/* Price / Add To CartSidebar Button */}
      <div className="group relative h-[30px] overflow-hidden">
        <div className="flex w-full justify-between items-center absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms]">
          {item.prices.discount !== 0 ? (
            <>
              <p className="!text-SecondaryText line-through">
                {t("fields.egp")} {format_price(item.prices.normal)}
              </p>
              <p className="font-semibold text-red-700">
                {t("fields.egp")} {format_price(item.prices.discount)}
              </p>
            </>
          ) : (
            <p className="absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms] font-semibold">
              {t("fields.egp")} {format_price(item.prices.normal)}
            </p>
          )}
        </div>
        <div className="absolute group-hover:top-0 top-[30px] transition-all duration-[450ms]">
          <UnderlinedProductAddToCart product={item} />
        </div>
      </div>
    </div>
  );
}
