"use client";
import React, { useState } from "react";
import Image from "next/image";
import { format_price } from "../../../../util/common";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import ReturnOrderDialog from "../dialogs/return-order.dialogs";
const OrderProductCard = ({order, return_product = false, product, currency, locale }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 relative border border-1 flex sm:flex-row flex-col sm:justify-start justify-center sm:text-start text-center gap-4 items-center">
      <div className="aspect-square w-44">
        <Image
          className="object-cover h-full w-full"
          width={200}
          height={200}
          src={product.product.photo.lg}
          alt={product.product.names[locale]}
        />
      </div>
      <div className="w-full space-y-2">
        <p className="font-bold text-lg">{product.product.names[locale]}</p>
        <p>
          {t("fields.quantity")}: {product.quantity}
        </p>
        <p>
          {t("fields.price")}: {currency} {format_price(product.price)}
        </p>
        <div className="flex w-full sm:justify-start justify-center items-center gap-2">
            <h3>
            {t("fields.color")}:
            </h3>
            <div className="flex gap-1 items-center">
                <span
                style={{backgroundColor:`${product.variant.color.color.hex}`}}
                className={"w-8 h-8 aspect-square rounded-full border"}
                ></span>
                <span>{product.variant.color.color.names[locale]}</span>
            </div>
        </div>
        {
          return_product && product.stats.can_return && order.status.current === "7" ? (
            <>
              <Button className="sm:!absolute !static w-full sm:w-auto bottom-4 end-4" variant="contained" onClick={() => setOpen(true)}>
                {t("fields.return-product")}
              </Button>
              <ReturnOrderDialog setOpen={setOpen} open={open} order={order} product={product}/>
            </>
          ) : <></>
        }
      </div>
    </div>
  );
};

export default OrderProductCard;
