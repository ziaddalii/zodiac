"use client";
import {CardActionArea} from "@mui/material";
import Link from "next/link";
import {create_slug, format_price, random_int_between} from "../../../../util/common";
import {useTranslation} from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import UnderlinedProductAddToCart from "../buttons/underlined-add-to-cart.buttons";
import {useMemo, useState} from "react";
import {toggle_loading} from "../global-progress-bar.common";
import {useCompareList} from "@/store/compare-list";
import {LoadingButton} from "@mui/lab";

export default function CompareProductCard({item, locale}) {

    const {t} = useTranslation();

    const {update_compare_list} = useCompareList();

    const [isLoading, setIsLoading] = useState(false);

    const on_toggle = async () => {

        setIsLoading(true);
        await toggle_loading(true);

        await update_compare_list(item.id);

        await toggle_loading(false);
        setIsLoading(false);
    };

    const random_colors_index = useMemo(() => random_int_between(0, item.photos.colors.length), [item]);

    const random_photos_index = useMemo(
        () => random_int_between(
            0,
            item.photos.colors[random_colors_index].photos.length,
        ), [item]);

    const first_variant =  useMemo(()=> item.variants[0], [item]);

    return (
        <div className="max-w-[200px]">
            <div className="flex justify-between items-center">
                <LoadingButton
                    loading={isLoading}
                    type="button"
                    disabled={isLoading}
                    onClick={on_toggle}
                    variant="text"
                    className="flex gap-1">

                    <CloseIcon fontSize="small"/>

                    <span>
                        {t("fields.remove")}
                    </span>

                </LoadingButton>
            </div>

            <div
                id="product-hover-group"
                className="group">


                {/* Image */}
                <div className="relative overflow-hidden">

                    <CardActionArea>
                        <Link href={`/products/${item.id}/${create_slug(item.names.en)}`}>
                            {item.photos.colors[random_colors_index] &&
                            item.photos.colors[random_colors_index].photos[random_photos_index] ? (
                                <>
                                    <img
                                        alt={item.name}
                                        src={item.photos.card}
                                        className="aspect-[4/5] h-full w-full object-cover group-hover:opacity-0 opacity-100 transition-all"
                                    />
                                    <img
                                        alt={item.name}
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
                        </Link>
                    </CardActionArea>

                    {/*Discount => Discount*/}
                    {first_variant.prices.discount > 0 && (
                        <div
                            className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-primary flex justify-center items-center text-white">
                            -{first_variant.prices.percent}%
                        </div>
                    )}

                    {/*New and No Discount => New*/}
                    {item.stats.is_new && first_variant.prices.discount === 0 && (
                        <div
                            className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-green-700 flex justify-center items-center text-white">
                            {t("fields.new")}
                        </div>
                    )}
                </div>

                {/* Name */
                }
                <h2>{item.names[locale]}</h2>

                {/* Category */
                }
                <p className="text-SecondaryText">
                    {item.category.names[locale]}
                </p>

                {/* Price / Add To CartSidebar Button */
                }
                <div className="group relative h-[30px] overflow-hidden">
                    <div
                        className="flex w-full justify-between items-center absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms]">
                        {first_variant.prices.discount !== 0 ? (
                            <>
                                <p className="!text-SecondaryText line-through">
                                    {format_price(first_variant.prices.normal)} {t("fields.egp")}
                                </p>
                                <p className="font-semibold">
                                    {format_price(first_variant.prices.discount)} {t("fields.egp")}
                                </p>
                            </>
                        ) : (
                            <p className="absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms] font-semibold">
                                {format_price(first_variant.prices.normal)} {t("fields.egp")}
                            </p>
                        )}
                    </div>

                    <div className="absolute group-hover:top-0 top-[30px] transition-all duration-[450ms]">
                        <UnderlinedProductAddToCart/>
                    </div>
                </div>

            </div>

        </div>
    );
}
