"use client";

import {Badge} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useFavoritesList} from "@/store/favorites-list";

export default function FavoriteBadge() {

    const {get_count} = useFavoritesList();

    return (
        <Badge badgeContent={get_count()} color="primary">
            <FavoriteBorderIcon color="primary"/>
        </Badge>
    );
}