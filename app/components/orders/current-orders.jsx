"use client";
import React from "react";
import CurrentOrdersCard from "./../common/cards/current-order.card";
import PaginationBarClient from "../common/pagination/pagination-client";
import { useCurrentOrders } from "@/store/orders";
const CurrentOrders = ({ current_orders, locale }) => {
  const { set_current_page, current_page, last_page } = useCurrentOrders();
  return (
    <div className="space-y-4">
      {current_orders.map((order) => (
        <CurrentOrdersCard locale={locale} key={order.id} order={order} />
      ))}
      <PaginationBarClient
        set_page={set_current_page}
        current_page={current_page}
        total_pages={last_page}
      />
    </div>
  );
};

export default CurrentOrders;
