import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {isArray, isString} from "lodash-es";
import {post_update_wishlist} from "../../api/requests/wishlist.requests";
import {notify} from "@/components/common/global-snack-bar.common";
import {is_authenticated} from "../../api/cookies.api";

export const useFavoritesList = create(
    persist(
        (set, get) => (
            {
                wish_list: [], // FULL LIST
                list: [],
                get_count: () => get().list.length,
                set_favorites_list: (new_list) => set({list: new_list}),
                set_wish_list: (new_list) => set({wish_list: new_list}),
                in_favorites_list: (product_id) => get().list.findIndex((e) => e === product_id) !== -1,
                update_favorites_list: async (product_id) => {
                    let current_list = get().list;

                    const found_index = current_list.findIndex((e) => e === product_id);

                    let is_favorite = false;

                    if (found_index !== -1) {
                        current_list.splice(found_index, 1);
                    } else {
                        current_list.push(product_id);
                        is_favorite = true;
                    }

                    // // IF AUTH SEND REQUEST
                    // if (is_authenticated()) {
                    //     const result = await post_update_wishlist({
                    //         favoritable_id: product_id,
                    //     });

                    //     if (isString(result)) {
                    //         notify(true, result);
                    //     } else {
                    //         set({wish_list: result});
                    //         current_list = result.map((e) => e.details.id);
                    //     }
                    // }

                    set({list: current_list});

                    return is_favorite;
                },
            }),
        {
            name: "favorites-list",
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
            }),
        }
    )
);
