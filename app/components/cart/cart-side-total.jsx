"use client";
import React from "react";
import {useTranslation} from "react-i18next";
import {useCartList} from "@/store/cart-list";
import {format_price} from "/util/common";
import {Button, Divider} from "@mui/material";
import {Link} from "next/link";

export default function CartSideTotal() {
    const {t} = useTranslation();
    const {subtotal} = useCartList();

    return (
        <section className="lg:col-span-2 w-full grid-cols-1 sticky top-4 h-fit border space-y-4 border-secondary p-8">
            <h2 className="text-2xl uppercase">{t("fields.cart-totals")}</h2>

            <Divider/>
            
            <article className="flex items-center justify-between">
                <span>{t("fields.total")}</span>
                <span>{t("fields.egp")} {format_price(subtotal)}</span>
            </article>

            <Button fullWidth variant="contained" component={Link} href="/auth/account/checkout">{t("fields.proceed-to-checkout")}</Button>
        </section>
    );
}
