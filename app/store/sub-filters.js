import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const useSubFilters = create(
    persist(
        (set, get) => ({
            page: 1,
            per_page: 50,
            sort: "latest",
            colors: [],
            brands: [],
            min: 0,
            max: 5000,
            set_sort: (sort) => set({sort: sort}),
            set_colors: (color) => {
                const colors = get().colors;
                const colorIndex = colors.findIndex((c) => c === color);
                if (colorIndex !== -1) {
                    // Color exists, remove it
                    const updatedColors = [
                        ...colors.slice(0, colorIndex),
                        ...colors.slice(colorIndex + 1),
                    ];
                    set(() => ({
                        colors: updatedColors,
                    }));
                } else {
                    // Color doesnt exist, add it
                    set(() => ({
                        colors: [...colors, color],
                    }));
                }
            },
            set_brands: (brand) => {
                const brands = get().brands;
                const brandIndex = brands.findIndex((c) => c === brand);
                if (brandIndex !== -1) {
                    // Brand exists, remove it
                    const updatedBrands = [
                        ...brands.slice(0, brandIndex),
                        ...brands.slice(brandIndex + 1),
                    ];
                    set(() => ({
                        brands: updatedBrands,
                    }));
                } else {
                    // Brand doesnt exist, add it
                    set(() => ({
                        brands: [...brands, brand],
                    }));
                }
            },
            set_min: (min) => set({min: min}),
            set_max: (max) => set({max: max}),
            filter_queries: () => {
                var queries = [
                    {
                        key: "page",
                        value: get().page,
                    },
                    {
                        key: "per_page",
                        value: get().per_page,
                    },
                ];

                queries.push({key: "sort", value: get().sort});

                queries.push({
                    key: "colors",
                    value: encodeURIComponent(JSON.stringify(get().colors)),
                });

                queries.push({
                    key: "brands",
                    value: encodeURIComponent(JSON.stringify(get().brands)),
                });
                queries.push({key: "min", value: get().min});
                queries.push({key: "max", value: get().max});

                return queries;
            },
            reset_filters: () =>
                set({
                    sort: "",
                    colors: [],
                    brands: [],
                    min: 0,
                    max: 5000,
                }),
        }),
        {
            name: "sub-cat-filters",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
