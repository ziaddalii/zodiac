import "@/globals.css";
import "@/sass/main.scss";
import TranslationsProvider from "@/components/providers/translations.provider";
import getTranslations from "@/i18n-next";
import ThemeProvider from "@/components/providers/theme.provider";
import NavBar from "@/components/navigation/nav-bar";
import CartSidebar from "@/components/cart/cart.sidebar";
import Footer from "@/components/footer/footer";
import {GlobalSnackbarNotification} from "@/components/common/global-snack-bar.common";
import {get_layout} from "../../api/requests/layout.requests";
import {isEmpty} from "lodash-es";
import InitProvider from "@/components/providers/init.provider";
import {GlobalProgressBar} from "@/components/common/global-progress-bar.common";
import QuickViewDialog from "@/components/common/dialogs/quick-view.dialogs";
import SearchDrawer from "@/components/common/drawer/search.drawer";
import {FRONT_URL} from "../../api/constants";
import dynamic from "next/dynamic";
import {AOSInit} from "@/components/common/aos";

const MobileAppbar = dynamic(
    () => import("@/components/navigation/mobile-appbar"),
    { ssr: false }
  );
export async function build_metadata(locale, other_meta = {}) {
    const {t} = await getTranslations(locale);

    const app_name = t("fields.app-name");
    const app_description = t("fields.app-description");

    const page_title = other_meta.title
        ? [other_meta.title, app_name].join(" | ")
        : app_name;

    const page_description = !isEmpty(other_meta.description)
        ? other_meta.description
        : app_description;

    return {
        metadataBase: new URL(FRONT_URL),
        title: page_title,
        description: page_description,
        keywords: "zodiac, ZodiacWear, zodiac wear, زودياك",
        twitter: {
            card: "summary",
            title: app_name,
            description: app_description,
        },
        openGraph: {
            title: app_name,
            description: app_description,
            url: FRONT_URL,
            siteName: "Zodiac",
        },
        ...other_meta,
    };
}

export async function generateMetadata({params: {locale}}) {
    return await build_metadata(locale);
}

export default async function RootLayout({params: {locale}, children}) {
    const {resources, dir} = await getTranslations(locale);

    const layout = await get_layout();
    return (
        <html lang={locale} dir={dir}>
        <body id="root">
        {/*Custom Scripts*/}
{/*        {layout.custom_scripts.header.map((e, i) => (
            <div key={`scripts-header-${i}`} id={`scripts-header-${i}`} dangerouslySetInnerHTML={{__html: e.content}}></div>
        ))}
        
        {layout.custom_scripts.body.map((e, i) => (
            <div key={`scripts-body-${i}`} id={`scripts-body-${i}`} dangerouslySetInnerHTML={{__html: e.content}}></div>
        ))}*/}
        <ThemeProvider locale={locale}>
            <TranslationsProvider locale={locale} resources={resources}>

                <GlobalProgressBar/>

                <MobileAppbar/>
                <NavBar navbar_data={layout.navbar} locale={locale}/>

                <CartSidebar locale={locale}/>

                <main className="min-h-[65vh]">{children}</main>

                <QuickViewDialog locale={locale}/>

           {/*     <Footer footer_data={layout.footer} locale={locale} custom_scripts={layout.custom_scripts.footer}/> */}

                <GlobalSnackbarNotification locale={locale}/>
                <SearchDrawer locale={locale}/>
            </TranslationsProvider>
        </ThemeProvider>

        <InitProvider/>

        <AOSInit/>

        </body>
        </html>
    );
}
