import {Container} from "@mui/material";
import Link from "next/link";
import getTranslations from "@/i18n-next";
import {build_metadata} from "@/[locale]/layout";
import {get_locations} from "../../../../../api/requests/locations.requests";
import {get_checkout} from "../../../../../api/requests/checkout.requests";
import ShippingAddressSection from "@/components/checkout/shipping-address-section";
import {ShippingFeesSummarySection} from "@/components/checkout/shipping-fees-section";
import {CheckoutSubmitSection} from "@/components/checkout/checkout-submit-section";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dynamic from "next/dynamic";

const  YourOrderSection = dynamic(() => import("@/components/checkout/your-order-section"), {ssr: false}) ;

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.checkout")}),
    });

} 


export default async function CheckoutPage({params: {locale}}) {
    const {t} = await getTranslations(locale);
    
    const locations = await get_locations();

    const checkout = await get_checkout();

    const current_arrow = locale === "en" ? (<ArrowForwardIcon className="opacity-50"/>) : (<ArrowBackIcon className="opacity-50"/>);

    return (
        <main>

            <nav className="bg-black text-white text-2xl flex flex-wrap items-center justify-center gap-2 py-8">
                <Link
                    className="opacity-50 hover:opacity-100 transition-all"
                    href="/auth/account/cart">{t("fields.shopping-cart")}</Link>
                {current_arrow}
                <Link href="/auth/account/cart"
                      >{t("fields.checkout")}</Link>
                {current_arrow}
                <span className="opacity-50">{t("fields.order-complete")}</span>
            </nav>

            <Container maxWidth="xl" component="section" className="space-y-8">
                
                <section className="grid md:grid-cols-2 grid-cols-1 gap-4 py-8">
                    
                    {/* Shipping Address */}
                    <ShippingAddressSection locations={locations} checkout={checkout} locale={locale}/>
                    
                    {/* Your Order */}
                    <YourOrderSection checkout={checkout} locale={locale}/>
                
                </section>
                
                <article className="border border-secondary rounded-1 p-4 space-y-4 pb-8">

                    <ShippingFeesSummarySection locale={locale}/>
                    
                    {/*<CheckoutPaymentSection/>*/}
                    <p className="text-xs text-center">
                        {t("fields.agreement")}{" "}
                        <Link className="font-bold hover:underline" href="/privacy">
                            {t("navigation.privacy-policy")}
                        </Link>
                    </p>
                    
                    <CheckoutSubmitSection locale={locale}/>
                    
                </article>
            </Container>
        </main>
    );
}
