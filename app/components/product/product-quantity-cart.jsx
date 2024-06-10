"use client";
import {useProductDetails} from "@/store/product-details";
import React from "react";
import QuantityCounterButtons from "@/components/common/buttons/quantity.buttons";
import ProductAddToCart from "@/components/common/buttons/product-add-to-cart";

export default function ProductDetailsQuantity({product}) {

    const {
        stock,
        quantity,
        set_quantity,
        current_variant,
        current_color,
    } = useProductDetails();


    return (
        <div className="flex items-center gap-4">
            <QuantityCounterButtons
                init={quantity}
                maxQuantity={stock}
                onUpdate={(new_quantity) => set_quantity(new_quantity)}
            />

            <ProductAddToCart
                product={product}
                current_variant={current_variant}
                current_color={current_color}
                cartable_id={current_color.id}
                quantity={quantity}
            />
        </div>
    );
}
