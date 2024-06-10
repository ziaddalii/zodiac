"use client";
import React, { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button, Divider } from "@mui/material";
import OrderProductCard from "./order-product.card";
import { useTranslation } from "react-i18next";
import {
  format_date,
  format_price,
  get_order_status_text,
  scroll_to_top,
} from "../../../../util/common";
import { toggle_loading } from "../global-progress-bar.common";
import { notify } from "../global-snack-bar.common";
import { patch_update_orders } from "../../../../api/requests/orders.requests";
import { useCurrentOrders } from "@/store/orders";
import { ConfirmationDialog } from "../dialogs/confirmation.dialogs";

const CurrentOrdersCard = ({ order, locale }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { set_current_orders, list: current_orders_list } = useCurrentOrders();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handle_cancel_order = async () => {
    setIsLoading(true);
    await toggle_loading(true);
    scroll_to_top();
    const result = await patch_update_orders(order.id, { status: "-1" });
    if (result) {
      notify(false, t("messages.operation-completed"));
      set_current_orders(
        current_orders_list.filter((item) => item.id !== order.id)
      );
    } else {
      notify(true, result);
    }
    await toggle_loading(false);
    setIsLoading(false);
  };

  return (
    <div className="p-4 border border-1">
      <div className="grid sm:grid-cols-3 grid-cols-1 mb-4 text-lg">
        <div className="col-span-2">
          <span className="font-bold">{t("fields.order-code")}: </span>
          <span> #{order.id}</span>
        </div>
        <div className="col-span-1">
          <span className="font-bold">{t("fields.order-status")}:</span>
          <span> {t(get_order_status_text(order.status.current))}</span>
        </div>
        <div className="col-span-2">
          <span className="font-bold">{t("fields.shipping-fees")}: </span>
          <span>
            {order.currency.names[locale]}
            {format_price(order.shipping_fees)}
          </span>
        </div>
        <div className="col-span-1">
          <span className="font-bold">{t("fields.total")}:</span>
          <span>
            {" "}
            {order.currency.names[locale]}
            {format_price(order.total)}
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
        <article className="md:col-span-2 sm:col-span-3 col-span-1 space-y-2">
          {order.products.map((product) => (
            <OrderProductCard
            order={order}
            return_product={true}
            locale={locale}
            currency={order.currency.names[locale]}
            key={product.id}
            product={product}
            />
          ))}
        </article>
        <aside className="md:col-span-1 sm:col-span-3">
          <div className=" p-4 space-y-4 border border-1">
            <strong className="flex flex-wrap gap-2 items-center">
              {t("fields.shipping-address")}:
              <span className="text-sm font-normal items-center flex gap-2">
                <FmdGoodIcon fontSize="small" />{" "}
                {order.address.floor_apartment_no},{" "}
                {order.address.building_name_or_no}, {order.address.street_name}
                , {order.address.nearest_landmark}, {order.city.names[locale]}
              </span>
            </strong>
            <Divider />
            <p className="text-sm font-normal items-center flex gap-2">
              <LocalPhoneIcon fontSize="small" /> {order.customer.phones[0]}
            </p>
            <Divider />
            <p className="text-sm items-center flex gap-2 font-bold">
              {t("fields.delivery-date")}:
              <span className="font-normal">
                {order.delivery_time.to
                  ? format_date(order.delivery_time.to)
                  : format_date(order.estimated.to)}
              </span>
            </p>
          </div>
          {order.stats.can_cancel && (
            <>
              <Button
                onClick={() => {
                  setShowConfirmDialog(true);
                }}
                sx={{ marginTop: "12px" }}
                disabled={isLoading}
                variant="contained"
                fullWidth
              >
                {t("fields.cancel-order")}
              </Button>
              <ConfirmationDialog
                t={t}
                show={showConfirmDialog}
                onConfirm={handle_cancel_order}
                onClose={() => {
                  setShowConfirmDialog(false);
                }}
              />
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CurrentOrdersCard;
