"use client";
import { Box, Divider, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "react-i18next";
import WishlistProductCard from "../common/cards/wishlist-product.card";
import { useEffect, useState } from "react";
import { useFavoritesList } from "@/store/favorites-list";
import { LoadingLayout } from "./../layout/loading.layout";

export default function Wishlist({ wishlist, locale }) {
  const { t } = useTranslation();

  const { set_favorites_list, set_wish_list, wish_list } = useFavoritesList();
const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    set_favorites_list(wishlist.map((e) => e.details.id));
    set_wish_list(wishlist);
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
  }, [wishlist]);

  return (
    <div>
      <LoadingLayout
        loading={isLoading}
        isEmpty={wishlist.length === 0}
        empty={
          <Box
            minHeight="50vh"
            className="flex flex-col flex-1 gap-4 justify-center items-center"
          >
            <ErrorOutlineIcon color="primary" sx={{ fontSize: "8rem" }} />
            <Typography variant="h6">{t("messages.empty-wishlist")}</Typography>
          </Box>
        }
      >
        <div className="space-y-4 mt-12">
          <h2 className="text-xl uppercase">
            {t("fields.your-products-wishlist")}
          </h2>
          <Divider />
        </div>

        <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 py-8">
          {wish_list.map((product) => (
            <WishlistProductCard
              key={product.id}
              locale={locale}
              item={product}
            />
          ))}
        </section>
      </LoadingLayout>
    </div>
  );
}
