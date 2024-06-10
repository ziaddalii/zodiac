"use client";
import {Button, Divider, Slider, Tooltip} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import {useFilters} from "@/store/filters";

export default function CategoryFilters({
                                            locale,
                                            sub_categories,
                                            colors,
                                            brands,
                                        }) {

    const {t} = useTranslation();

    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const sort_data = useMemo(() => {
        return [
            {
                name: t("fields.latest"),
                query: {
                    key: "order",
                    value: "latest",
                },
            },
            {
                name: t("fields.popular"),
                query: {
                    key: "order",
                    value: "popular",
                },
            },
            {
                name: t("fields.reviews"),
                query: {
                    key: "order",
                    value: "reviews",
                },
            },
            {
                name: t("fields.price-low-to-high"),
                query: {
                    key: "order",
                    value: "price_low",
                },
            },
            {
                name: t("fields.price-high-to-low"),
                query: {
                    key: "order",
                    value: "price_high",
                },
            },
        ];
    }, []);

    const {
        sort,
        set_sort,
        colors: current_colors,
        set_colors,
        sub_categories: current_sub_categories,
        set_sub_categories,
        brands: current_brands,
        set_brands,
        set_min,
        set_max,
        min,
        max,
        reset_filters,
        filter_queries,
    } = useFilters();

    const handle_query = (queries) => {
        const newParams = new URLSearchParams(searchParams.toString());

        queries.forEach((query) => {
            newParams.set(query.key, query.value);
        });

        router.push(`${pathname}?${newParams.toString()}`);
    };

    const handleChange = (event, newValue) => {
        set_min(newValue[0]);
        set_max(newValue[1]);
    };

    return (
        <>
            <Button onClick={() => setOpen(!open)} className="flex gap-2">
                <TuneIcon/>
                {t("fields.filters")}
            </Button>

            {open ?? <Divider/>}

            <div
                className={`w-full basis-full transition-all ease-in-out duration-300 overflow-hidden border-y-1 border-y ${open ? "py-8 max-h-[125rem]" : "py-0 max-h-[0rem]"}`}
            >
                <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 py-4 gap-8">
                    {/*Sort by */}
                    <article className="col-span-1 space-y-4">
                        <h2 className="text-lg uppercase">{t("fields.sort-by")}</h2>
                        <ul className="space-y-2">
                            {sort_data.map((item, i) => {
                                return (
                                    <li
                                        key={i}
                                        className={`cursor-pointer text-SecondaryText flex justify-between hover:text-primary ${sort === item.query.value ? "text-primary" : "text-SecondaryText"}`}
                                        onClick={() => {
                                            set_sort(item.query.value);
                                        }}
                                    >
                                        <span>{item.name}</span>
                                        {sort === item.query.value && <CheckIcon/>}
                                    </li>
                                );
                            })}

                            <li className="text-primary !mt-8 text-lg uppercase hover:text-primary">
                                {t("fields.price-range")}
                            </li>
                            <li className="px-4 !mt-12">
                                <Slider
                                    getAriaLabel={() => {
                                        t("fields.price-range");
                                    }}
                                    value={[min, max]}
                                    min={0}
                                    max={5000}
                                    onChange={handleChange}
                                    valueLabelDisplay="on"
                                    getAriaValueText={() => {
                                        t("fields.egp");
                                    }}
                                />
                            </li>
                        </ul>
                    </article>

                    {/* Sub Categories */}
                    <article className="col-span-1 space-y-4 h-full">
                        <h2 className="text-lg uppercase">{t("fields.categories")}</h2>
                        <ul className="gap-2 text-SecondaryColor hover:text-primary space-y-2 max-h-[300px] overflow-auto">
                            {sub_categories.map((sub_category) => (
                                <li
                                    key={sub_category.id}
                                    className="cursor-pointer group"
                                    onClick={() => set_sub_categories(sub_category.id)}
                                >
                                    <div className="flex gap-4 items-center relative">
                                        <Image
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                            alt={sub_category.names.en}
                                            src={sub_category.photos.lg}
                                        />

                                        <article className="relative">
                                            <h3 className="capitalize">{sub_category.names[locale]}</h3>
                                            <p className="text-SecondaryText">
                                                {sub_category.count.products} {t("fields.products")}
                                            </p>
                                        </article>

                                        {current_sub_categories.includes(sub_category.id) && (<CheckIcon className="ms-auto"/>)}

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/*Colors */}
                    <article className="col-span-1 space-y-4">

                        <h2 className="text-lg uppercase">
                            {t("fields.filter-by-colors")}
                        </h2>

                        <ul className="gap-2 text-SecondaryColor hover:text-primary space-y-2 max-h-[300px] overflow-auto">
                            {colors.map((color) => (
                                <li
                                    className="cursor-pointer group"
                                    key={color.id}
                                    onClick={() => {
                                        set_colors(color.id);
                                    }}
                                >
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-4 items-center">
                                            <div
                                                style={{backgroundColor: color.hex}}
                                                className={
                                                    "w-6 h-6 aspect-square border relative rounded-full"
                                                }
                                            >
                                                {current_colors.includes(color.id) && (
                                                    <CheckIcon
                                                        fontSize="sm"
                                                        className="absolute text-white top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    />
                                                )}
                                            </div>
                                            <span
                                                className={`capitalize text-SecondaryText group-hover:text-primary ${current_colors.find((current_color) => current_color === color.id) ? "text-primary" : "text-SecondaryText"}`}
                                            >
                        {color.names[locale]}
                      </span>
                                        </div>
                                        <div
                                            className={`rounded-full border transition-all group-hover:bg-black group-hover:text-white bg-white text-black px-4 text-xs ${current_colors.find((current_color) => current_color === color.id) ? "!bg-black !text-white" : "bg-white text-black"}`}
                                        >
                                            {color.count.products}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/*Brands */}
                    <article className="col-span-1 space-y-4">
                        <h2 className="text-lg uppercase">{t("fields.filter-by-brand")}</h2>
                        <div className="max-h-[300px] overflow-auto">
                            <ul className="gap-2 grid grid-cols-2 text-SecondaryColor hover:text-primary ">
                                {brands.map((brand) => (
                                    <li
                                        key={brand.id}
                                        className={`col-span-1 h-fit hover:opacity-[100%] cursor-pointer ${current_brands.find((current_brand) => current_brand === brand.id) ? "opacity-[100%]" : "opacity-[50%]"}`}
                                        onClick={() => {
                                            set_brands(brand.id);
                                        }}
                                    >
                                        <Tooltip title={brand.names[locale]} placement="top">
                                            <Image
                                                width={250}
                                                height={150}
                                                className="h-[8rem] object-contain w-fit"
                                                alt={brand.photos.alt}
                                                src={brand.photos.lg}
                                            />
                                        </Tooltip>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </section>
                <Divider/>
                <article className="sm:flex-row flex-col flex justify-center gap-x-4 gap-y-2 mt-4">
                    <Button
                        variant="outlined"
                        className="sm:w-auto w-full block"
                        onClick={reset_filters}
                    >
                        {t("fields.reset")}
                    </Button>
                    <Button
                        variant="contained"
                        className="sm:w-auto w-full block"
                        onClick={() => handle_query(filter_queries())}
                    >
                        {t("fields.submit")}
                    </Button>
                </article>
            </div>

            {open && <Divider/>}
        </>
    );
}
