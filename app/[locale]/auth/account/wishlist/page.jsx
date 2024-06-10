import {Box, Breadcrumbs, Container} from "@mui/material";
import getTranslations from "@/i18n-next";
import {get_wishlist} from "../../../../../api/requests/wishlist.requests";
import Wishlist from "@/components/wishlist/wishlist";
import {build_metadata} from "@/[locale]/layout";
import Link from "next/link";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.wishlist")}),
    });
}

export default async function WishlistPage({params: {locale}}) {

    const {t} = await getTranslations(locale);

    const wishlist = await get_wishlist();

    return (
        <Box component="main">
            <article className="bg-black py-8 text-center space-y-4">

                <h2 className="text-white text-5xl">{t("navigation.wishlist")}</h2>

                <Breadcrumbs
                    className="mx-auto"
                    sx={{
                        "& .MuiBreadcrumbs-ol": {
                            justifyContent: "center",
                        },
                    }}
                    aria-label="breadcrumb"
                >
                    <Link
                        className="hover:opacity-75 transition-all uppercase text-sm"
                        href="/"
                    >
                        {t("navigation.home")}
                    </Link>
                    <h3 className="text-white uppercase text-sm">
                        {t("navigation.wishlist")}
                    </h3>
                </Breadcrumbs>
            </article>

            <Container maxWidth="xl" component="section" className="space-y-8">
                <Wishlist wishlist={wishlist} locale={locale}/>
            </Container>

        </Box>
    );
}
