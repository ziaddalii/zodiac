"use client";
import {useTranslation} from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useFavoritesList} from "@/store/favorites-list";
import {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductAddToWishlist({product_id}) {

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
        <LoadingButton
            onClick={on_toggle}
            loading={isLoading}
            disabled={isLoading}
            variant="text" sx={{display: "flex", gap: "4px"}}>
            {is_favorite ? <FavoriteIcon  className="shadow-xl" color="accent"/> : <FavoriteBorderIcon/>}
            {t(!is_favorite ? "fields.add-to-wishlist" : "fields.remove-from-wishlist")}
        </LoadingButton>
    );
}
