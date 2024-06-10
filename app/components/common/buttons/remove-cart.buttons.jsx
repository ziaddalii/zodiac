"use client";


import {LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import {useCartList} from "@/store/cart-list";

export default function RemoveCartButtons(
    {
        product = {},
    }) {

    const {update_cart_list} = useCartList();
    const [isLoading, setIsLoading] = useState(false);

    const on_remove = async () => {

        setIsLoading(true);

        const cartable = {
            cart_id: product.id,
            ...product.details,
        };

        await update_cart_list(cartable, product.details.variant, product.details.color);

        setIsLoading(false);
    };

    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            type="button"
            sx={{minWidth: 0, p: 0, m: 0}}
            onClick={on_remove}
        >
            <CloseIcon fontSize="small"/>
        </LoadingButton>
    );
}
