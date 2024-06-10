"use client";

import { useTranslation } from "react-i18next";
import { useCartList } from "@/store/cart-list";
import { useQuickViewDetails } from "@/store/quick-view-details";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function ProductAddToCart({
  product,
  current_variant = null,
  current_color = null,
  cartable_id = null,
  quantity = 1,
}) {
  const { t } = useTranslation();

  const { toggle_cart: on_cart_toggle, update_cart_list } = useCartList();
  const { open, on_toggle: on_quick_view_toggle } = useQuickViewDetails();

  const [isLoading, setIsLoading] = useState(false);

  const on_update = async () => {
    setIsLoading(true);

    // IF NOT CARTABLE ID THEN SHOW QUICK VIEW
    if (cartable_id) {
      await update_cart_list(product, current_variant, current_color, quantity);
      console.log(current_color);
      on_cart_toggle(true);
    } else if (!open) {
        console.log("not open");
      on_quick_view_toggle(true, product);
    }

    if (open) {
      on_quick_view_toggle(false);
    }

    setIsLoading(false);
  };

  return (
    <LoadingButton
      loading={isLoading}
      disabled={isLoading}
      onClick={on_update}
      variant="contained"
    >
      {t("fields.add-to-cart")}
    </LoadingButton>
  );
}
