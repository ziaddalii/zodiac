"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import OrderProductCard from "./../common/cards/order-product.card";
import { format_price, get_order_status_text } from "../../../util/common";
import PaginationBarClient from "../common/pagination/pagination-client";
import { useOrdersHistory } from "@/store/orders";
const OrdersHistory = ({ orders_history, locale }) => {
  const { t } = useTranslation();
  const { set_current_page, current_page, last_page } = useOrdersHistory();
  return (
    <div className="space-y-4">
      {orders_history.map((order) => (
        <div key={order.id}>
          <div className="p-4 border border-1">
            <div className="grid sm:grid-cols-3 grid-cols-1 mb-4 text-lg">
              <div className="col-span-2">
                <span className="font-bold">{t("fields.order-code")}: </span>
                <span> #{order.id}</span>
              </div>
              <div className="col-span-1">
                <span className="font-bold">{t("fields.order-status")}: </span>
                <span> {t(get_order_status_text(order.status.current))}</span>
              </div>
              <div className="col-span-1">
                <span className="font-bold">{t("fields.total")}: </span>
                <span>
                  {order.currency.names[locale]} {format_price(order.total)}
                </span>
              </div>
            </div>
            <article className="md:col-span-2 col-span-1 space-y-2">
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
          </div>
        </div>
      ))}
      <PaginationBarClient
        set_page={set_current_page}
        current_page={current_page}
        last_page={last_page}
      />
    </div>
  );
};

export default OrdersHistory;
