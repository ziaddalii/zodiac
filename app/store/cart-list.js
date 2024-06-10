import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isArray, isString } from "lodash-es";
import { is_authenticated } from "../../api/cookies.api";
import {
  post_public_cart,
  post_update_cart,
} from "../../api/requests/cart.requests";
import { notify } from "@/components/common/global-snack-bar.common";

export const useCartList = create(
  persist(
    (set, get) => ({
      open: false,
      cart_list: [], // FULL LIST
      list: [],
      subtotal: 0,
      discount: 0,
      fees: 0,
      total: 0,
      coupon_percent: 0,
      coupon_discount: 0,
      total_after_coupon: 0,
      coupon_code:"",
      cancel_coupon: () =>
        set({ total_after_coupon: 0, coupon_discount: 0, coupon_percent: 0, coupon_code:"" }),
      set_fees: (fees) => set({ fees: fees, total: get().total + fees }),
      set_coupon: (coupon) => {
        if (coupon.discount_value > get().total) {
          const total_price_after_coupon_percent = get().total - get().total * coupon.discount_percent / 100;
          // If discount_price is bigger than the total price of the order then use discount percentage instead
          set({
            total_after_coupon: Math.floor(total_price_after_coupon_percent),
            coupon_percent: `${coupon.discount_percent.toString()}%`,
            coupon_code:coupon.code,
          });
        } else {
          // If discount_price is smaller than the total price of the order then use discount_value
          set({
            total_after_coupon: get().total - coupon.discount_value,
            coupon_discount: coupon.discount_value.toString(),
            coupon_code:coupon.code,
          });
        }
      },
      toggle_cart: (value) => set({ open: value }),
      get_count: () => get().list.length,
      set_cart_list: (cart) => {
        set({
          cart_list: cart.details,
          list: cart.details.map((e) => ({
            cartable_id: e.details.color.id,
            quantity: e.quantity,
          })),
          subtotal: cart.total,
          total: cart.total + get().fees,
        });
      },
      set_total: (total) => set({ total: total }),
      set_subtotal: (subtotal) => set({ subtotal: subtotal }),
      update_cart_list: async (
        product,
        current_variant,
        current_color,
        quantity = -1,
        old_quantity = 0
      ) => {
        //IF USER AUTHENTICATED
        // if (is_authenticated()) {
          // const payload =
          //   quantity !== -1
          //     ? {
          //         cartable_id: current_color.id,
          //         quantity: quantity - old_quantity,
          //       }
          //     : {
          //         id: product.cart_id,
          //       };

          // const result = await post_update_cart(payload);

          // if (isString(result)) {
          //   notify(true, result);
          // } else {
          //   set({
          //     subtotal: result.total,
          //     cart_list: result.details,
          //     list: result.details.map((e) => ({
          //       cartable_id: e.details.color.id,
          //       quantity: e.quantity,
          //     })),
          //   });

          //   return quantity;
          // }
        // } else {

          const payload = {
            cart: get().list,
          };

          const found_index = payload.cart.findIndex(
            (e) => e.cartable_id === current_color.id
          );

          if (found_index === -1) {
            payload.cart.push({
              cartable_id: current_color.id,
              quantity: quantity,
            });
          } else if (quantity === -1) {
            payload.cart.splice(found_index, 1);
          } else {
            payload.cart[found_index].quantity = quantity - old_quantity;
          }

          // const result = await post_public_cart(payload);

          // if (isString(result)) {
          //   notify(true, result);
          // } else {
            const prev_cart_list = get().cart_list;
            set({
              subtotal: get().subtotal + product.price,
              cart_list:[ ...prev_cart_list, product],
              // list: result.details.map((e) => ({
              //   cartable_id: e.details.color.id,
              //   quantity: e.quantity,
              // })),
            });

            // return quantity;
          // }
        // }
      },
    }),
    {
      name: "cart-list",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "list" && !isArray(value)) {
            return [];
          }

          return value;
        },
      }),
      partialize: (state) => ({
        list: state.list,
        open: false,
        subtotal: 0,
        discount: 0,
        fees: 0,
        total: 0,
      }),
    }
  )
);
