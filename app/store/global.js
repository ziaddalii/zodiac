import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {get_profile} from "../../api/requests/profile.requests";
import {useFavoritesList} from "@/store/favorites-list";
import {useCartList} from "@/store/cart-list";
import {deleteCookie} from "cookies-next";
import {is_authenticated} from "../../api/cookies.api";
import {post_public_cart} from "../../api/requests/cart.requests";
import {isString} from "lodash-es";
import {notify} from "@/components/common/global-snack-bar.common";

export const useGlobalStore = create(
    persist(
        (set) => ({
            theme: "light",
            toggle_theme: (new_theme) => set({theme: new_theme}),
            init_profile: async () => {
                const {set_cart_list, list} = useCartList.getState();

                if (is_authenticated()) {
                    const profile_data = await get_profile();
                    const {set_favorites_list} = useFavoritesList.getState();

                    set_favorites_list(profile_data.favorites.map((e) => e.details.id));
                    set_cart_list(profile_data.cart);
                } else {

                    if (list.length === 0) {
                        return;
                    }

                    const result = await post_public_cart({
                        cart: list,
                    });

                    if (isString(result)) {
                        notify(true, result);
                    } else {
                        set_cart_list(result);
                    }
                }
            },
            logout: () => {

                deleteCookie("token");
                deleteCookie("user_id");

                localStorage.clear();
                sessionStorage.clear();

                // router.refresh();
                window.location.href = "/";
            },
        }),
        {
            name: "global",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
