import HeroCarousel from "@/components/common/carousels/hero-carousel.carousels";
import BannerCarousel from "@/components/common/carousels/banner.carousel";
import BestSellersSection from "@/components/home/best-sellers.section";
import NewArrivalsSection from "@/components/home/new-arrivals.section";
import CategoriesSection from "@/components/home/categories.section";
import OurArticleSection from "@/components/home/our-article.section";
import OurServicesSection from "@/components/home/our-services.section";
import PinnedSection from "@/components/home/pinned.section";
import VideoSection from "@/components/home/video.section";
import { Divider } from "@mui/material";
import { build_metadata } from "@/[locale]/layout";
import getTranslations from "@/i18n-next";
import { get_kids_page } from "../../api/requests/home.requests";
import { slides } from "../../data/hero-slides";
import { products } from "../../data/products";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.home-kids") }),
  });
}

export default async function HomePage({ params: { locale } }) {
  const kids_data = await get_kids_page();

  // REMOVE EMPTY SUB OR EMPTY MAIN
  // const carousel_filtered = kids_data.carousel.filter((e) => e.main.id && e.sub.id);

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      {slides.length > 0 && <HeroCarousel slides={slides} locale={locale} />}

      {/* Pinned Section */}
      {/* kids_data.scatter.length > 0 && <PinnedSection scatter={kids_data.scatter} locale={locale}/>*/}

      {/* Best Sellers Section */}
      {products.length > 0 && (
        <BestSellersSection best_sellers={products} locale={locale} />
      )}

      {/* New Arrivals Section */}
      {kids_data.best_sellers.length > 0 && (
        <NewArrivalsSection
          new_arrivals={kids_data.new_arrivals}
          locale={locale}
        />
      )}

      {/* Categories Section */}
      {kids_data.categories.length > 0 && (
        <CategoriesSection categories={kids_data.categories} locale={locale} />
      )}

      {/* Banner Carousel Section */}
      {/*<BannerCarousel banners={kids_data.banners} locale={locale}/>*/}

      {/* Video Section */}
      <VideoSection locale={locale} />

      {/* Newsletter Section */}
      {/*<NewsletterSection/>*/}

      {/* Articles */}
      {kids_data.blog_articles.length > 0 && (
        <OurArticleSection articles={kids_data.blog_articles} locale={locale} />
      )}

      <Divider />

      {/*Our Services Section*/}
      <OurServicesSection locale={locale} />
    </div>
  );
}
