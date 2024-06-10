import {create} from "zustand";

export const useQuickViewDetails = create((set, get) => ({
    open: false,
    set_open: (open) => set({open: open}),

    variants: [],
    product: {},
    set_product: (product) => set({product: product}),

    current_variant_index: -1,
    current_variant: {},
    current_color_index: -1,
    current_color: {},
    price: {
        normal: 0,
        discount: 0,
        percent: 0,
    },
    stock: 0,
    colors: [],
    photos: [],

    quantity: 0,
    set_quantity: (new_quantity) => {
        set({quantity: new_quantity});
        return new_quantity;
    },

    set_variants: (variants) => set({variants: variants}),
    set_current_variant: (variant_index = -1) => {

        const current_variant = get().variants?.[variant_index] ?? {};

        set({
            current_variant_index: variant_index,
            current_variant: current_variant,
            price: current_variant.prices ?? {
                normal: 0,
                discount: 0,
                percent: 0,
            },
            colors: current_variant.colors ?? [],
            current_color_index: 0,
            current_color: current_variant.colors?.[0] ?? {},
            stock: current_variant.colors?.[0].stock ?? 0,
            photos: current_variant.colors?.[0].photos ?? [],
        });
    },
    set_price: (price) => set({price: price}),
    set_stock: (stock) => set({stock: stock}),
    set_colors: (colors) => set({colors: colors}),
    set_current_color: (color_index = -1) => {
        const current_color = get().colors[color_index] ?? {};

        set({
            current_color_index: color_index,
            current_color: current_color,
            stock: current_color.stock ?? 0,
            photos: current_color.photos ?? [],
        });
    },
    set_photos: (photos) => set({photos: photos}),
    on_toggle: (state = false, product = {}) => {

        set({
            open: state,
            product,
        });

        get().set_variants(product.variants ?? []);
        get().set_current_variant(product.id ? 0 : -1);


        const event_hover_leave = new MouseEvent("mouseout", {
            "view": window,
            "bubbles": true,
            "cancelable": true,
        });

        document.querySelector("#product-hover-group").dispatchEvent(event_hover_leave);
    },
}));
