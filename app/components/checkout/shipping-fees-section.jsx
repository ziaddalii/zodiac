"use client";
import {useTranslation} from "react-i18next";
import {useCartList} from "@/store/cart-list";
import {format_price} from "../../../util/common";
import CouponInput from "../common/inputs/coupon.input";
import {Divider} from "@mui/material";

export function ShippingFeesSummarySection({locale}) {

  const { t } = useTranslation();

  const {
    fees,
    subtotal,
    total,
    total_after_coupon,
    coupon_percent,
    coupon_discount,
  } = useCartList();

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>{t("fields.subtotal")}</h2>
        <span>
          {format_price(subtotal)} {t("fields.egp")}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <h2>{t("fields.shipping-fees")}</h2>
        <span>
          {format_price(fees)} {t("fields.EGP")}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <h2>{t("fields.total")}</h2>
        <span className={`${total_after_coupon !== 0 && "line-through"}`}>
          {format_price(total)} {t("fields.EGP")}
        </span>
      </div>
      <div className="flex justify-center">
        <CouponInput locale={locale} />
      </div>

      {total_after_coupon !== 0 && (
        <div className="space-y-2">
          <Divider />
          {coupon_percent !== 0 && (
            <div className="flex w-full justify-between items-center">
              <h2 className="text-xl">{t("fields.coupon-percent")}</h2>
              <span>
                {coupon_percent}
              </span>
            </div>
          )}

          {coupon_discount !== 0 && (
            <div className="flex w-full justify-between items-center">
              <h2 className="text-xl">{t("fields.coupon-discount")}</h2>
              <span>
                {t("fields.egp")} {format_price(coupon_discount)}
              </span>
            </div>
          )}

          <div className="flex w-full justify-between items-center">
            <h2 className="text-xl">{t("fields.total-after-coupon")}</h2>
            <span>
              {t("fields.egp")} {format_price(total_after_coupon)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
