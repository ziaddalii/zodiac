import { create } from "zustand";

export const useSearchDrawer = create((set, get) => ({
  list: [],
  open:false,
  current_page: 1,
  last_page: 1,
  set_current_orders: (current_orders) => set(() => ({ list: current_orders })),
  set_current_page: (current_page) => set(() => ({ current_page: current_page })),
  set_last_page: (last_page) => set(() => ({ last_page: last_page })),
  set_list: (list) => set(() => ({ list: list })),
  set_open: (open) => set(() => ({ open: open })),
}));
