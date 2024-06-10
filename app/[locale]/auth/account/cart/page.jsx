import {Container} from "@mui/material";
import getTranslations from "@/i18n-next";
import {build_metadata} from "@/[locale]/layout";
import CartSideTotal from "@/components/cart/cart-side-total";
import {get_cart} from "../../../../../api/requests/cart.requests";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dynamic from "next/dynamic";
import Link from "next/link";

const CartTable = dynamic(() => import("@/components/cart/cart-table"), {
    ssr: false,
});

export async function generateMetadata({params: {locale}}) {

    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.cart")}),
    });

}

export default async function CartPage({params: {locale}}) {

    const {t} = await getTranslations(locale);

    const cart = await get_cart();

    const current_arrow = locale === "en" ? (<ArrowForwardIcon className="opacity-50"/>) : (<ArrowBackIcon className="opacity-50"/>);

    return (
        <main>
            <nav className="bg-black text-white text-2xl flex flex-wrap items-center justify-center gap-2 py-8">
                <Link href="/auth/account/cart">{t("fields.shopping-cart")}</Link>
                {current_arrow}
                <Link href="/auth/account/cart"
                      className="opacity-50 hover:opacity-100 transition-all">{t("fields.checkout")}</Link>
                {current_arrow}
                <span className="opacity-50">{t("fields.order-complete")}</span>
            </nav>

            <Container maxWidth="xl" component="section" className="min-h-[65vh] py-8">
                <section className="grid lg:grid-cols-6 grid-cols-1 gap-4 h-full relative">

                    {/*Table Section*/}
                     <section className="col-span-1 lg:col-span-4">
                     <CartTable cart={cart} locale={locale}/>
                     </section>

                    {/*Side Cart Total Section*/}
                    <CartSideTotal locale={locale}/>

                </section>
            </Container>
        </main>
    );
}
