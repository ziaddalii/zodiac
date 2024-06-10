"use client";

import {useCompareList} from "@/store/compare-list";
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {post_compare} from "../../../api/requests/compare.requests";
import {useTranslation} from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import CompareProductCard from "@/components/common/cards/compare-product.card";
import {LoadingLayout} from "../layout/loading.layout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function CompareTable({locale}) {

    const {t} = useTranslation();

    const {list, compare_list_table, set_compare_list_table} = useCompareList();
    const [isLoading, setIsLoading] = useState(true);

    async function post_compare_request(list) {
        const compare_data = await post_compare({products: list});
        set_compare_list_table(compare_data);
    }

    useEffect(() => {
        post_compare_request(list).finally(() => setIsLoading(false));
    }, [list]);


    return (
        <div>
            <LoadingLayout
                loading={isLoading}
                isEmpty={compare_list_table.products.length === 0}
                empty={
                    <article className="flex flex-col justify-center items-center">
                        <h2 className="text-2xl">{t("messages.empty-products")}</h2>
                        <ErrorOutlineIcon sx={{height: "16rem", width: "16rem"}}/>
                    </article>
                }>

                <TableContainer sx={{boxShadow: "none"}} component={Paper}>
                    <Table sx={{minWidth: "100%"}} aria-label="compare table">
                        <TableBody>

                            {/*Products*/}
                            <TableRow className="text-lg">

                                <TableCell variant="head" className="uppercase text-xl"></TableCell>

                                {compare_list_table.products.map((product) => (
                                    <TableCell className="max-w-[150px]" key={product.id}>
                                        <CompareProductCard item={product} locale={locale}/>
                                    </TableCell>
                                ))
                                }

                            </TableRow>

                            {/*Stock*/}
                            <TableRow className="text-lg">

                                <TableCell variant="head" className="uppercase text-xl">
                                    {t("fields.availability")}
                                </TableCell>

                                {compare_list_table.in_stock.map((item, i) => {
                                    return (
                                        <TableCell key={`stock-${i}`} sx={{minWidth: "100px"}}>
                                            {item ? (
                                                <div className="flex gap-1 items-center">
                                                    <CheckIcon/> {t("fields.in-stock")}
                                                </div>
                                            ) : (
                                                t("fields.out-of-stock")
                                            )}
                                        </TableCell>
                                    );
                                })}

                            </TableRow>

                            {/*Brands*/}
                            <TableRow>
                                <TableCell variant="head" className="uppercase text-xl">
                                    {t("fields.brand")}
                                </TableCell>

                                {compare_list_table.brands.map((brand, i) => {
                                    return (
                                        <TableCell sx={{minWidth: "100px"}} className="capitalize"
                                                   key={`brands-${i}-${brand.id}`}>{brand.names[locale]}</TableCell>
                                    );
                                })}

                            </TableRow>

                            {/*Sizes*/}
                            <TableRow className="text-lg">

                                <TableCell variant="head" className="uppercase text-xl">
                                    {t("fields.sizes")}
                                </TableCell>

                                {compare_list_table.sizes.map((variant, i) => (
                                    <TableCell sx={{minWidth: "100px"}} className="space-y-2"
                                               key={`variants-${variant.id}-${i}`}
                                    >
                                        {variant.map((size, f) => (
                                            <div key={`sizes-${i}-${f}-${size.id}`} className="flex gap-2 w-full">
                                                <h2 className="min-w-24">{size.size.names[locale]}:</h2>

                                                <ul className="flex gap-2">
                                                    {size.colors.map((color) => (
                                                        <span
                                                            key={`colors-${variant.id}-${i}-${f}-${color.id}`}
                                                            className="size-6 aspect-square rounded-full"
                                                            style={{backgroundColor: `${color.hex}`}}
                                                        ></span>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </TableCell>
                                ))}

                            </TableRow>

                        </TableBody>

                    </Table>
                </TableContainer>
            </LoadingLayout>
        </div>
    );
}
