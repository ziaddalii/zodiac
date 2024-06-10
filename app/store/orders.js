import { create } from "zustand";

export const useCurrentOrders = create((set, get) => ({
  list: [],
  current_page: 1,
  last_page: 1,
  get_count: () => get().list.length,
  set_current_orders: (current_orders) => set(() => ({ list: current_orders })),
  set_current_page: (current_page) => set(() => ({ current_page: current_page })),
  set_last_page: (last_page) => set(() => ({ last_page: last_page })),
}));

export const useOrdersHistory = create((set, get) => ({
  list: [],
  current_page: 1,
  last_page: 0,
  get_count: () => get().list.length,
  set_orders_history: (orders_history) => set(() => ({ list: orders_history })),
  set_current_page: (current_page) => set(() => ({ current_page: current_page })),
  set_last_page: (last_page) => set(() => ({ last_page: last_page })),
}));
