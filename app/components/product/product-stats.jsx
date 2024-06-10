"use client";

import {useProductDetails} from "@/store/product-details";
import {useTranslation} from "react-i18next";

export default function ProductStats({is_new}) {

  const {t} = useTranslation();

  const { price } = useProductDetails();

  return (
    <div>

      {/*Discount => Discount*/}
      {price.discount > 0 && (
        <div className="rounded-[50%] aspect-square w-12 bg-primary flex justify-center items-center text-white">
          -{price.percent}%
        </div>
      )}

      {/*New and No Discount => New*/}
      {is_new && price.discount === 0 && (
        <div className="rounded-[50%] aspect-square w-12 bg-green-700 flex justify-center items-center text-white">
          {t("fields.new")}
        </div>
      )}

    </div>
  );
}
