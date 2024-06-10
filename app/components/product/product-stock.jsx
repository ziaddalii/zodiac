"use client";
import { useProductDetails } from "@/store/product-details";
import React from "react";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import { format_price } from "../../../util/common";
export default function StockProductDetails() {
  const { t } = useTranslation();
  const { stock } = useProductDetails();
  return (
    <div className="flex gap-2 items-center">
      <CheckIcon />
      <p>
        {format_price(stock)} {t("fields.in-stock")}
      </p>
    </div>
  );
}
