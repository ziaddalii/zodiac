import {build_metadata} from "@/[locale]/layout";
import PagesTitle from "./../../components/common/headers/pages.titles";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {get_shipping} from "../../../api/requests/shipping.requests";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);
    const shipping_data = await get_shipping();

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.shipping-delivery")}),
        keywords: shipping_data.tags,
    });
}

export default async function ShippingPage({params: {locale}}) {

    const {t} = await getTranslations(locale);

    const shipping_data = await get_shipping();

    return (
        <Container maxWidth="xl">

            {/* Page Title */}
            <PagesTitle title={t("navigation.shipping-delivery")}/>

            {/* Content */}
            <section className="pb-8 prose lg:prose-xl" dangerouslySetInnerHTML={
                {__html: shipping_data.contents[locale]}
            }>
            </section>
        </Container>
    );
}
