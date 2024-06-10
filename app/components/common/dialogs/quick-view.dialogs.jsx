"use client";
import {Button, Dialog, DialogContent} from "@mui/material";
import QuantityCounterButtons from "../buttons/quantity.buttons";
import ProductStats from "@/components/product/product-stats";
import Image from "next/image";
import {useQuickViewDetails} from "@/store/quick-view-details";
import dynamic from "next/dynamic";
import CheckIcon from "@mui/icons-material/Check";
import {format_price} from "../../../../util/common";
import CloseIcon from "@mui/icons-material/Close";
import ProductAddToCart from "./../buttons/product-add-to-cart";
import {useTranslation} from "react-i18next";
import {SlideUpTransition} from "@/components/common/transitions/slide.transitions";
import DefaultImg from "/public/default.webp";
import ShareButtons from "@/components/common/buttons/share-button";

const QuickViewSelectSize = dynamic(
    () => import("@/components/product/quick-view-select-size"),
    {ssr: false}
);

export default function QuickViewDialog({locale}) {
    const {
        set_quantity,
        quantity,
        stock,
        open,
        on_toggle,
        photos,
        product,
        price,
        current_color,
        current_variant,
    } = useQuickViewDetails();

    const {t} = useTranslation();

    const handleClose = () => {
        on_toggle(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={SlideUpTransition}
            keepMounted
            onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    maxWidth: "920px",
                    minWidth: "320px",
                    width: "100%",
                    borderRadius: "0",
                },
            }}
            aria-describedby="quick-view-dialog"
        >
            <DialogContent className="relative">

                <section className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 mt-12">
                    {/* Product Images */}
                    <article>
                        <Image
                            width={1000}
                            height={1000}
                            alt={product.name || "product-main-img"}
                            src={photos[0] || DefaultImg.src}
                        />
                    </article>

                    {/* Product Main Info */}
                    <article className="col-span-1 space-y-4 pb-8">

                        <div className="flex justify-between items-center">
                            <h2 className="text-4xl">{product?.names?.[locale] ?? ""}</h2>
                            <ProductStats is_new={product?.stats?.is_new}/>
                        </div>

                        {/* Price */}
                        <div className="flex justify-between">
                            <h3 className={`${price.discount !== 0 && "line-through"}`}>
                                {t("fields.EGP")} {format_price(price.normal)}
                            </h3>
                            {price.discount !== 0 && (
                                <h3 className="text-red-700 font-semibold">
                                    {t("fields.EGP")} {format_price(price.discount)}
                                </h3>
                            )}
                        </div>

                        {/* Desc */}
                        <p className="text-sm text-SecondaryText">
                            {product?.descriptions?.[locale] ?? ""}
                        </p>

                        {/* Stock */}
                        <div className="flex gap-2 items-center">
                            <CheckIcon/>
                            <p>
                                {format_price(stock)} {t("fields.in-stock")}
                            </p>
                        </div>

                        {/* Select Size */}
                        <QuickViewSelectSize
                            locale={locale}
                        />

                        {/* Quantity Counter / Add to cart*/}
                        <div className="flex items-center gap-4">
                            <QuantityCounterButtons
                                init={1}
                                maxQuantity={stock}
                                onUpdate={(new_quantity) => set_quantity(new_quantity)}
                            />

                            <ProductAddToCart
                                product={product}
                                quantity={quantity}
                                current_variant={current_variant}
                                current_color={current_color}
                                cartable_id={current_color?.id}/>
                        </div>
                        <div className="flex items-center gap-2">
                            <h2>{t("fields.share")}:</h2>
                            <ShareButtons product_id={product.id} locale={locale}/>
                        </div>
                    </article>

                    {/* Close Dialog Button */}
                    <Button
                        onClick={handleClose}
                        sx={{minWidth: "0", padding: "0"}}
                        variant="text"
                        className="!absolute top-4 end-4"
                    >
                        <CloseIcon/>
                    </Button>

                </section>
            </DialogContent>
        </Dialog>
    );
}
