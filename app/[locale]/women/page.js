import HeroCarousel from "@/components/common/carousels/hero-carousel.carousels";
import BannerCarousel from "@/components/common/carousels/banner.carousel";
import BestSellersSection from "@/components/home/best-sellers.section";
import NewArrivalsSection from "@/components/home/new-arrivals.section";
import CategoriesSection from "@/components/home/categories.section";
import OurArticleSection from "@/components/home/our-article.section";
import OurServicesSection from "@/components/home/our-services.section";
import PinnedSection from "@/components/home/pinned.section";
import VideoSection from "@/components/home/video.section";
import {Divider} from "@mui/material";
import {build_metadata} from "@/[locale]/layout";
import getTranslations from "@/i18n-next";
import {get_women_page} from "../../../api/requests/women.requests";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    return (await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.home-women")}),
    }));
}


export default async function HomePage({params : {locale}}) {

    const women_data = await get_women_page();

    // REMOVE EMPTY SUB OR EMPTY MAIN
    const carousel_filtered = women_data.carousel.filter((e) => e.main.id && e.sub.id);

    return (
        <div className="space-y-12">

            {/* Hero Carousel */}
            {carousel_filtered.length > 0 && <HeroCarousel slides={carousel_filtered} locale={locale}/>}

            {/* Pinned Section */}
            {women_data.scatter.length > 0 && <PinnedSection scatter={women_data.scatter} locale={locale}/>}

            {/* Best Sellers Section */}
            {women_data.best_sellers.length > 0 && <BestSellersSection best_sellers={women_data.best_sellers} locale={locale}/>}

            {/* New Arrivals Section */}
            {women_data.best_sellers.length > 0 && <NewArrivalsSection new_arrivals={women_data.new_arrivals} locale={locale}/>}

            {/* Categories Section */}
            {women_data.categories.length > 0 && <CategoriesSection categories={women_data.categories} locale={locale}/>}

            {/* Banner Carousel Section */}
            <BannerCarousel banners={women_data.banners} locale={locale}/>

            {/* Video Section */}
            <VideoSection locale={locale}/>

            {/* Newsletter Section */}
            {/*<NewsletterSection/>*/}

            {/* Articles */}
            {women_data.blog_articles.length > 0 && <OurArticleSection articles={women_data.blog_articles} locale={locale}/>}

            <Divider/>

            {/*Our Services Section*/}
            <OurServicesSection locale={locale}/>

        </div>
    );
}
