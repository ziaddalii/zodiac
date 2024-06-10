"use client";
import { useTranslation } from "react-i18next";
import UnderlinedButton from "./underlined.button";
import { useQuickViewDetails } from "@/store/quick-view-details";
import { useCartList } from "@/store/cart-list";
import { useState } from "react";

export default function UnderlinedProductAddToCart({
  product,
  current_variant = null,
  current_color = null,
  cartable_id = null,
  quantity = 1,
}) {
  const { t } = useTranslation();

  const { update_cart_list } = useCartList();
  const { on_toggle } = useQuickViewDetails();

  const [isLoading, setIsLoading] = useState(false);

  const on_update = async () => {
    setIsLoading(true);

    // IF NOT CARTABLE ID THEN SHOW QUICK VIEW
    if (cartable_id) {
      update_cart_list(cartable_id, quantity);
    } else {
      on_toggle(true, product);
    }

    setIsLoading(false);
  };

  return (
    <UnderlinedButton disabled={isLoading} onClick={on_update}>
      {t("fields.add-to-cart")}
    </UnderlinedButton>
  );
}
