import {create} from "zustand";

export const useProductDetails = create(
    (set, get) => ({
        open: false,
        variants: [],
        current_variant_index: 0,
        current_variant: {},
        current_color_index: 0,
        current_color: {},
        price: {
            normal: 0,
            discount: 0,
            percent: 0,
        },
        stock: 0,
        quantity: 1,
        colors: [],
        photos: [],
        default_photos: [],
        set_variants: (variants) => set({variants: variants}),
        set_current_variant: (variant_index) => {

            let current_variant_index = 0;
            let current_variant = get().variants[0];

            if (variant_index < get().variants.length && variant_index >= 0) {
                current_variant = get().variants[variant_index];
                current_variant_index = variant_index;
            }

            set({
                price: current_variant.prices,
                colors: current_variant.colors,
                current_variant: current_variant,
                current_variant_index: current_variant_index,
                current_color: current_variant.colors[0],
                quantity: 1,
                stock: current_variant.colors[0].stock,
                photos: current_variant.colors[0].photos,
            });
        },
        set_price: (price) => set({price: price}),
        set_stock: (stock) => set({stock: stock}),
        set_quantity: (new_quantity) => {
            set({quantity: new_quantity});
            return new_quantity;
        },
        set_colors: (colors) => set({colors: colors}),
        set_current_color: (color_index) => {

            let current_color = get().colors[0];
            let current_color_index = 0;

            if (color_index < get().colors.length && color_index >= 0) {
                current_color = get().colors[color_index];
                current_color_index = color_index;
            }
            set(() => ({
                current_color: current_color,
                current_color_index: current_color_index,
                stock: current_color.stock,
                quantity: 1,
                photos: current_color.photos,
            }));
        },
        set_photos: (photos) => set({photos: photos}),
        set_default_photos: (default_photos) => set({default_photos: default_photos}),

    }),
);
