import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isArray } from "lodash-es";

export const useCompareList = create(
  persist(
    (set, get) => ({
      list: [], // array of product ids
      compare_list: [],
      get_count: () => get().list.length,
      set_compare_list: (new_list) => set(() => ({ list: new_list })),
      compare_list_table: { products: [], brands: [], in_stock: [], sizes: [] },
      set_compare_list_table: (payload) => set(() => ({ compare_list_table: { products: payload.products, brands: payload.brands, in_stock: payload.in_stock, sizes: payload.variants } })),
      in_compare_list: (product_id) =>
        get().list.findIndex((e) => e === product_id) !== -1,
      update_compare_list: (product_id) => {
        const current_list = get().list;
        const current_compare_list_products = get().compare_list_table.products;
        const current_compare_list_brands = get().compare_list_table.brands;
        const current_compare_list_in_stock = get().compare_list_table.in_stock;
        const current_compare_list_sizes = get().compare_list_table.sizes;
        const found_index = current_list.findIndex((e) => e === product_id);
        const found_table_index = get().compare_list_table.products.findIndex((e) => e.id === product_id);
        let is_compared = false;

        if (found_index !== -1) {
          current_list.splice(found_index, 1);
          current_compare_list_products.splice(found_table_index, 1);
          current_compare_list_brands.splice(found_table_index, 1);
          current_compare_list_in_stock.splice(found_table_index, 1);
          current_compare_list_sizes.splice(found_table_index, 1);
        } else {
          current_list.push(product_id);
          is_compared = true;
        }
        console.log("curreeeent", current_list);
        set({ list: current_list });

        return is_compared;
      },
    }),
    {
      name: "compare_list",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "list" && !isArray(value)) {
            return [];
          }

          return value;
        },
      }),
    }
  )
);
