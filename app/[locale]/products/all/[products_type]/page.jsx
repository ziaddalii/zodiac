import {build_metadata} from "@/[locale]/layout";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import ProductCard from "@/components/common/cards/product.card";
import {get_products_type_page} from "../../../../../api/requests/products-type.requests";
import {format_page_num, get_products_type} from "../../../../../util/common";
import SortSelect from "@/components/common/inputs/sort-select.inputs";
import PaginationBar from "@/components/common/pagination/pagination";
import {notFound} from "next/navigation";

export async function generateMetadata({params: {locale, products_type}}) {
    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {
            title: t(get_products_type(products_type)),
        }),
    });
}

export default async function ProductsTypePage(props) {

    const searchParams = props.searchParams;
    const {locale, products_type} = props.params;

    if (!["best-sellers", "new-arrivals"].includes(products_type)) {
        notFound();
    }

    const {t} = await getTranslations(locale);

    const formatted_page = format_page_num(searchParams.page);

    const sort_by = searchParams.sort === undefined ? "" : searchParams.sort;

    const products_data = await get_products_type_page(
        products_type,
        formatted_page,
        sort_by,
    );

    return (
        <Container maxWidth="xl" sx={{padding: "2rem 0"}}>

            <div className="flex justify-between items-center">

                {/* Page Title */}
                <article className="my-8">
                    <div className="h-[1px] w-20 bg-[black] mb-4"></div>
                    <p className="text-3xl text-primary font-bold">
                        {t(get_products_type(products_type))}
                    </p>
                </article>

                {/* Sort Select */}
                <SortSelect></SortSelect>

            </div>

            {/* Products */}
            <section className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 mb-8">
                {products_data.data.map((item) => (
                    <ProductCard key={item.id} item={item} locale={locale}/>
                ))}
            </section>

            {/* Pagination */}
            <PaginationBar
                base_url={`/products/all/${products_type}`}
                current_page={formatted_page}
                first_page={products_data.first_page}
                total_pages={products_data.last_page}
                per_page={products_data.per_page}
                total_count={products_data.total_count}
                t={t}
            />
        </Container>
    );
}
