"use client";
import {useProductDetails} from "@/store/product-details";
import React from "react";
import {useTranslation} from "react-i18next";
import {format_price} from "../../../util/common";

export default function PriceProductDetails(
    {
        price = 0,
        discount = 0,
    },
) {
    const {t} = useTranslation();

    const {price: current_price} = useProductDetails();

    return (
        <div className="flex justify-between">
            <h3 className={`${current_price.discount !== 0 && "line-through"}`}>
                {t("fields.EGP")} {format_price(current_price.normal || price)}
            </h3>
            {current_price.discount !== 0 && (
                <h3 className="text-red-700 font-semibold">
                    {t("fields.EGP")} {format_price(current_price.discount || discount)}
                </h3>
            )}
        </div>
    );
}
