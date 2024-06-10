import {CardActionArea} from "@mui/material";
import {create_slug, format_price, random_int_between} from "../../../../util/common";
import Link from "next/link";


export default function SearchCard({item, locale, egp}) {
    const random_colors_index = random_int_between(0, item.photos.colors.length);

    const random_photos_index = random_int_between(
        0,
        item.photos.colors[random_colors_index].photos.length,
    );

  return (
    <div
    id="product-hover-group"
    className="col-span-1 group">

    {/* Image */}
    <div className="relative overflow-hidden">

        <CardActionArea>

            <Link href={`/products/${item.id}/${create_slug(item.names.en)}`}>
                {item.photos.colors[random_colors_index] &&
                item.photos.colors[random_colors_index].photos[random_photos_index] ? (
                    <>
                        <img
                            alt={item.photos.alt || "product-card"}
                            src={item.photos.card}
                            className="aspect-[4/5] h-full w-full object-cover group-hover:opacity-0 opacity-100 transition-all"
                        />
                        <img
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
                    <img
                        alt={item.photos.alt || "product-card"}
                        src={item.photos.card}
                        className="aspect-[4/5]"
                    />
                )}
            </Link>
        </CardActionArea>
    </div>

    {/* Name */}
    <h2>{item.names[locale]}</h2>

    {/* Category - Sub Category */}
    <p className="text-SecondaryText">{`${item.category.names[locale]} - ${item.sub_category.names[locale]}`}</p>

    {/* Price / Add To CartSidebar Button */}
    <div className="group relative h-[30px] overflow-hidden">
        <div
            className="flex w-full justify-between items-center absolute top-0 transition-all duration-[450ms]">
            {item.prices.discount !== 0 ? (
                <>
                    <p className="!text-SecondaryText line-through">
                        {egp} {format_price(item.prices.normal)}
                    </p>
                    <p className="font-semibold text-red-700">
                        {egp} {format_price(item.prices.discount)}
                    </p>
                </>
            ) : (
                <p className="absolute top-0 transition-all duration-[450ms] font-semibold">
                    {egp} {format_price(item.prices.normal)}
                </p>
            )}
        </div>
    </div>
</div>
  );
}
