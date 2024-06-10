import getTranslations from "@/i18n-next";
import { Breadcrumbs, CardActionArea, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CategoryFilters from "@/components/category/filters.category";
import CategoriesNav from "@/components/category/categories-nav.category";
import ProductCard from "@/components/common/cards/product.card";
import PaginationBar from "@/components/common/pagination/pagination";
import { build_base_url_query, format_page_num } from "../../../../util/common";
import ShowType from "@/components/category/show-type.category";
import ProductCardLine from "@/components/common/cards/product-line.card";
import {
  get_categories_filter,
  post_categories_filter,
} from "../../../../api/requests/category.requests";
import { notFound } from "next/navigation";
import { build_metadata } from "@/[locale]/layout";
import Marquee from "react-fast-marquee";
import { FRONT_URL } from "../../../../api/constants";

export async function generateMetadata({
  params: { locale, category_id },
  searchParams: { page },
}) {
  const { t } = await getTranslations(locale);

  const parsed_page = format_page_num(page);

  const { category } = await get_categories_filter(category_id);
  if (!category.id) {
    notFound();
  }
  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: category.names[locale] }),
    keywords: category.tags,
    description: category.subtitles[locale],
    openGraph: {
      title: category.names[locale],
      description: category.subtitles[locale],
      url: `${FRONT_URL}/${locale}/categories/${encodeURIComponent(category.id)}?page=${parsed_page}`,
      locale,
      images: {
        url: category.photos.card,
        alt: category.name,
      },
      siteName: t("app.name"),
      tags: [category.tags, category.name, category.subtitle].join(","),
    },
    twitter: {
      title: category.names[locale],
      description: category.subtitle,
      card: "summary_large_image",
      images: {
        url: category.photos.card,
        alt: category.name,
      },
      site: FRONT_URL,
    },
  });
}

export default async function CategoryPage(props) {
  const { locale, category_id } = props.params;

  const {
    page = 1,
    per_page: per_page_query = 50,
    view = "4",
    sort = "latest",
    min = null,
    max = null,
    colors: colors_query = null,
    brands: brands_query = null,
    sub: sub_categories_query = null,
  } = props.searchParams;

  const { t } = await getTranslations(locale);

  const parsed_page = format_page_num(page);

  const payload = {
    page: parsed_page,
    per_page: 50,
    category: Number(category_id),
    sort: "latest",
  };

  const manage_payload = () => {
    if (per_page_query) {
      payload.per_page = Number(per_page_query);
    }

    if (sort) {
      payload.sort = sort;
    }

    if (
      colors_query &&
      JSON.parse(decodeURIComponent(colors_query)).length !== 0
    ) {
      payload.colors = JSON.parse(decodeURIComponent(colors_query));
    }

    if (
      brands_query &&
      JSON.parse(decodeURIComponent(brands_query)).length !== 0
    ) {
      payload.brands = JSON.parse(decodeURIComponent(brands_query));
    }

    if (
      sub_categories_query &&
      JSON.parse(decodeURIComponent(sub_categories_query)).length !== 0
    ) {
      payload.sub_categories = JSON.parse(
        decodeURIComponent(sub_categories_query)
      );
    }

    if (min && Number(min) !== 0) {
      payload.min = Number(min);
    }

    if (max && Number(max) !== 5000) {
      payload.max = Number(max);
    }

    return payload;
  };

  const { category, categories, sub_categories, brands, colors } =
    await get_categories_filter(category_id);

  if (!category.id) {
    notFound();
  }

  const category_data = await post_categories_filter(manage_payload());

  const getView = () => {
    if (view === "list") {
      return "1";
    } else {
      if (view === "grid-5") {
        return "5";
      }
      if (view === "grid-4") {
        return "4";
      }
      if (view === "grid-3") {
        return "3";
      }
    }
  };

  return (
    <section className="pb-8">
      <nav className="bg-black py-4">
        <div dir="ltr">
          {/* Desktop Categories */}
          <Marquee
            pauseOnHover={true}
            autofill={true}
            play={categories.length >= 6}
            speed={50}
            direction={locale === "en" ? "left" : "right"}
            className="*:justify-center lg:!flex !hidden"
          >
            <div className="flex gap-12 w-full justify-between overflow-hidden">
              {categories.map((category) => (
                <CardActionArea key={category.id}>
                  <Link
                    href={`/categories/${category.id}?page=1`}
                    className="flex items-center gap-2 w-full"
                  >
                    <Image
                      width={40}
                      height={40}
                      className="object-contain size-10"
                      alt={category.photos.alt}
                      src={category.photos.card}
                    />
                    <article>
                      <h3 className="text-white capitalize">
                        {category.names[locale]}
                      </h3>
                      <div className="flex gap-1">
                        <span className="text-SecondaryText">{category.count.products}</span>
                        <p className="text-SecondaryText">
                          {t("fields.products")}
                        </p>
                      </div>
                    </article>
                  </Link>
                </CardActionArea>
              ))}
            </div>
          </Marquee>

          {/* Mobile Categories */}
          <div className="lg:hidden block px-4">
            <CategoriesNav categories={categories} locale={locale} />
          </div>
        </div>
      </nav>

      <Container maxWidth="xl">
        <section className="py-8 flex gap-2 flex-wrap justify-between items-center">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              {t("navigation.home")}
            </Link>
            <Link underline="hover" color="inherit" href="/categories">
              {t("navigation.categories")}
            </Link>
            <p className="text-primary capitalize">{category.names[locale]}</p>
          </Breadcrumbs>

          <div className="hidden items-center gap-4 ms-auto lg:flex">
            {/*Show / Grid */}
            <ShowType />
          </div>

          {/* Filters */}
          <CategoryFilters
            locale={locale}
            sub_categories={sub_categories}
            colors={colors}
            brands={brands}
          />

          {/* Products list */}
          <section
            className={`grid w-full gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-${getView()} lg:grid-cols-${getView()} ${view === "list" && "!grid-cols-1"}`}
          >
            {view === "list"
              ? category_data.data.map((product) => (
                  <ProductCardLine
                    item={product}
                    locale={locale}
                    key={product.id}
                  />
                ))
              : category_data.data.map((product) => (
                  <ProductCard
                    item={product}
                    locale={locale}
                    key={product.id}
                  />
                ))}
          </section>
        </section>

        <PaginationBar
          base_url={`/categories/${category.id}`}
          query={build_base_url_query({
            per_page: per_page_query,
            view,
            sort,
            min,
            max,
            colors: colors_query,
            brands: brands_query,
            sub: sub_categories_query,
          })}
          current_page={parsed_page}
          first_page={category_data.first_page}
          total_pages={category_data.last_page}
          per_page={category_data.per_page}
          total_count={category_data.total_count}
          t={t}
        />
      </Container>
    </section>
  );
}
