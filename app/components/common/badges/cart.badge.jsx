"use client";

import {Badge} from "@mui/material";
import {useCartList} from "@/store/cart-list";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function CartBadge() {

    const {get_count} = useCartList();

    return (
        <Badge badgeContent={get_count()} color="primary">
            <ShoppingCartOutlinedIcon color="primary"/>
        </Badge>
    );
}