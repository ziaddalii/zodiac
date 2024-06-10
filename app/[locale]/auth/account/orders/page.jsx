import {Box, Container} from "@mui/material";
import getTranslations from "@/i18n-next";
import {build_metadata} from "@/[locale]/layout";
import Orders from "@/components/orders/orders";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.orders")}),
    });

}

export default async function OrdersPage(props) {

    const {locale} = props.params;

    return (
        <Box component="main">
            <Container maxWidth="xl" component="section" className="py-8">
                {/*Table Section*/}
                <Orders
                    locale={locale}
                />
            </Container>
        </Box>
    );
}
