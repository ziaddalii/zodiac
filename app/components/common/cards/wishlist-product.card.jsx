"use client";
import {ButtonGroup, CardActionArea} from "@mui/material";
import Link from "next/link";
import {format_price, random_int_between} from "../../../../util/common";
import {useTranslation} from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import UnderlinedProductAddToCart from "../buttons/underlined-add-to-cart.buttons";
import {useMemo, useState} from "react";
import {toggle_loading} from "../global-progress-bar.common";
import {useFavoritesList} from "@/store/favorites-list";
import {LoadingButton} from "@mui/lab";
import dynamic from "next/dynamic";

const CompareButton = dynamic(
    () => import("@/components/common/buttons/compare.buttons"),
    {ssr: false},
);

const QuickViewButton = dynamic(
    () => import("@/components/common/buttons/quick-view.buttons"),
    {ssr: false},
);

export default function WishlistProductCard({item, locale}) {

    const {t} = useTranslation();

    const {update_favorites_list} = useFavoritesList();

    const [isLoading, setIsLoading] = useState(false);

    const on_toggle = async () => {

        setIsLoading(true);
        await toggle_loading(true);

        await update_favorites_list(item.details.id);

        await toggle_loading(false);
        setIsLoading(false);
    };

    const random_colors_index = useMemo(() => random_int_between(0, item.details.photos.colors.length), [item]);

    const random_photos_index = useMemo(
        () => random_int_between(
            0,
            item.details.photos.colors[random_colors_index].photos.length,
        ), [item]);

    return (
        <div>
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
                className="col-span-1 group">


                {/* Image */}
                <div className="relative overflow-hidden">

                    <CardActionArea>

                        <Link href={`/products/${item.id}/${create_slug(item.names.en)}`}>
                            {item.details.photos.colors[random_colors_index] &&
                            item.details.photos.colors[random_colors_index].photos[random_photos_index] ? (
                                <>
                                    <img
                                        alt={item.details.name}
                                        src={item.details.photos.card}
                                        className="aspect-[4/5] h-full w-full object-cover group-hover:opacity-0 opacity-100 transition-all"
                                    />
                                    <img
                                        alt={item.details.name}
                                        src={
                                            item.details.photos.colors[random_colors_index].photos[
                                                random_photos_index
                                                ]
                                        }
                                        className="aspect-[4/5] h-full w-full object-cover absolute top-0 start-0 group-hover:opacity-100 duration-700 ease-out opacity-0 group-hover:scale-110 scale-100 transition-all"
                                    />
                                </>
                            ) : (
                                <img
                                    alt={item.details.photos.alt}
                                    src={item.details.photos.card}
                                    className="aspect-[4/5]"
                                />
                            )}
                        </Link>
                    </CardActionArea>

                    {/*Buttons*/}
                    <ButtonGroup
                        className="absolute group-hover:end-4 -end-10 top-4 transition-all duration-[450ms]"
                        variant="contained"
                        orientation="vertical"
                        aria-label="vertical text button group"
                    >
                        {/*Compare*/}
                        <CompareButton product_id={item.details.id}/>

                        {/*Quick View*/}
                        <QuickViewButton product={item.details} locale={locale}/>

                    </ButtonGroup>

                    {/*Discount => Discount*/}
                    {item.details.variant.prices.discount > 0 && (
                        <div
                            className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-primary flex justify-center items-center text-white">
                            -{item.details.variant.prices.percent}%
                        </div>
                    )}

                    {/*New and No Discount => New*/}
                    {item.details.stats.is_new && item.details.variant.prices.discount === 0 && (
                        <div
                            className="absolute top-2 start-2 rounded-[50%] aspect-square w-12 bg-green-700 flex justify-center items-center text-white">
                            {t("fields.new")}
                        </div>
                    )}
                </div>

                {/* Name */
                }
                <h2>{item.details.names[locale]}</h2>

                {/* Category */
                }
                <p className="text-SecondaryText">
                    {item.details.category.names[locale]}
                </p>

                {/* Price / Add To CartSidebar Button */
                }
                <div className="group relative h-[30px] overflow-hidden">
                    <div
                        className="flex w-full justify-between items-center absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms]">
                        {item.details.variant.prices.discount !== 0 ? (
                            <>
                                <p className="!text-SecondaryText line-through">
                                    {format_price(item.details.variant.prices.normal)} {t("fields.egp")}
                                </p>
                                <p className="font-semibold">
                                    {format_price(item.details.variant.prices.discount)} {t("fields.egp")}
                                </p>
                            </>
                        ) : (
                            <p className="absolute group-hover:top-[-30px] top-0 transition-all duration-[450ms] font-semibold">
                                {format_price(item.details.variant.prices.normal)} {t("fields.egp")}
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
