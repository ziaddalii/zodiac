"use client";
import {Button, Divider, LinearProgress, Slide} from "@mui/material";
import {useEffect, useRef} from "react";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {useTranslation} from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "next/link";
import CartMenuCard from "../common/cards/cart-menu.card";
import {format_price} from "/util/common";
import {useCartList} from "@/store/cart-list";

export default function CartSidebar({locale}) {
    const {open, toggle_cart, list, subtotal} = useCartList();
    const {t} = useTranslation();

    const cartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                toggle_cart(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cartRef]);

    useEffect(() => {
        if (open) {
            if (typeof window != "undefined" && window.document) {
                document.body.style.overflow = "hidden";
            }
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);
    return (
        <div className={`fixed overflow-hidden ${open ? "z-[51]" : "z-[-1]"} top-0 end-0`}>

            {/* CartSidebar */}
            <Slide direction={`${locale=== "ar" ? "right" : "left"}`} in={open}>

                <div
                    ref={cartRef}
                    className="shadow-lg overflow-auto flex flex-col justify-between p-4 bg-white transition-all h-screen top-0 duration-300 !z-[52] relative ease-in-out md:w-[25rem] w-[20rem]"
                >

                    {/*If List is Empty */}
                    {list.length === 0 ? (
                        <div>

                            <div className="space-y-4 pb-4 flex justify-between items-center">
                                <h2 className="text-xl">{t("fields.shopping-list")}</h2>
                                <Button
                                    sx={{minWidth: 0, p: 0, marginTop: "0!important"}}
                                    onClick={() => toggle_cart(false)}
                                >
                                    <CloseIcon/>
                                </Button>
                            </div>

                            <Divider/>

                            <div className="text-center space-y-4 pt-4">

                                <ProductionQuantityLimitsIcon className="!text-[8rem] text-SecondaryText"/>

                                <p>{t("placeholders.no-products-found")}</p>

                                <Button
                                    component={Link}
                                    variant="contained"
                                    href="/"
                                    onClick={() => toggle_cart(false)}
                                >
                                    {t("fields.return-to-shop")}
                                </Button>

                            </div>

                        </div>
                    ) : (
                        <>
                            {/*If List is not Empty */}
                            <div className="flex flex-col justify-between h-full">

                                <div className="space-y-2 h-[60%]">

                                    <div className="space-y-4 pb-4 flex justify-between items-center">
                                        <h2 className="text-xl">{t("fields.shopping-list")}</h2>
                                        <Button
                                            sx={{minWidth: 0, p: 0, marginTop: "0!important"}}
                                            onClick={() => toggle_cart(false)}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                    </div>

                                    <div
                                        style={{height: "calc(100% - 44px)"}}
                                        className="overflow-auto"
                                    >
                                        {list.map((product) => (
                                            <div key={product.id}>
                                                <CartMenuCard product={product}/>
                                                <Divider/>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-end flex-none bg-white">
                                    <div className="w-full h-fit bg-white">

                                        <Divider/>

                                        <div className="py-4 flex justify-between">
                                            <p className="text-lg font-bold">Subtotal:</p>
                                            <p className="font-bold">EGP{format_price(subtotal)}</p>
                                        </div>

                                        <Divider/>

                                        <p className="my-4">
                                            {t("placeholders.add-#-get-free-shipping", {amount: format_price(1200)})}
                                        </p>

                                        <LinearProgress
                                            className="mb-4"
                                            variant="determinate"
                                            value={25}
                                        />

                                        {/* Buttons */}
                                        <Button
                                            className="!mb-2"
                                            component={Link}
                                            href="/auth/account/cart"
                                            color="secondary"
                                            fullWidth
                                            variant="contained"
                                        >
                                            {t("fields.view-cart")}
                                        </Button>
                                        <Button
                                            component={Link}
                                            href="/auth/account/checkout"
                                            fullWidth
                                            variant="contained"
                                        >
                                            {t("fields.check-out")}
                                        </Button>
                                        <Divider/>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Slide>

            {/* Overlay */}
            <div
                onClick={() => toggle_cart(false)}
                className={`fixed top-0 left-0 w-full h-full bg-[#000000] pointer-events-none !z-[51] transition-all ${open ? "opacity-70 block pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            ></div>

        </div>
    );
}
