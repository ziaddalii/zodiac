"use client";
import {Tooltip} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useTranslation} from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useEffect, useState} from "react";
import {useFavoritesList} from "@/store/favorites-list";
import {LoadingButton} from "@mui/lab";

export default function FavoriteButton({product_id}) {

    const {t} = useTranslation();

    const {update_favorites_list, in_favorites_list} = useFavoritesList();

    const [is_favorite, set_is_favorite] = useState(in_favorites_list(product_id));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        set_is_favorite(in_favorites_list(product_id));
    }, []);

    const on_toggle = async () => {
        setIsLoading(true);
        set_is_favorite(
            await update_favorites_list(product_id),
        );
        setIsLoading(false);
    };

    return (
        <Tooltip title={t(!is_favorite ? "fields.add-to-wishlist" : "fields.remove-from-wishlist")}
                 placement="left-start">
            <LoadingButton
                type="button"
                loading={isLoading}
                disabled={isLoading}
                onClick={on_toggle}
                sx={{px: 0, minWidth: 0}}>
                {is_favorite ? <FavoriteIcon color="accent"/> : <FavoriteBorderIcon/>}
            </LoadingButton>
        </Tooltip>
    );
}
