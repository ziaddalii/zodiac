import getTranslations from "@/i18n-next";
import { Breadcrumbs, Container, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { get_product_details } from "../../../../../api/requests/product-details.requests";
import { toLower } from "lodash-es";
import StockProductDetails from "@/components/product/product-stock";
import ProductStats from "@/components/product/product-stats";
import PriceProductDetails from "@/components/product/product-price";
import ProductDetailsQuantity from "@/components/product/product-quantity-cart";
import dynamic from "next/dynamic";
import ProductRelatedProductsSection from "@/components/common/carousels/product-related-products.section";
import ShareButtons from "@/components/common/buttons/share-button";
import { FRONT_URL } from "../../../../../api/constants";
import { notFound } from "next/navigation";
import { products } from "../../../../../data/products";

const ProductCompareButton = dynamic(
  () => import("@/components/common/buttons/product-compare"),
  { ssr: false }
);
const ProductAddToWishlist = dynamic(
  () => import("@/components/common/buttons/product-add-to-wishlist"),
  { ssr: false }
);
const ProductImagesCarousel = dynamic(
  () => import("@/components/common/carousels/product.carousel"),
  { ssr: false }
);
const ProductSelectSize = dynamic(
  () => import("@/components/product/product-select-size"),
  { ssr: false }
);
const ProductInfoTabs = dynamic(
  () => import("@/components/product/product-info.tabs")
);

export async function generateMetadata({ params: { locale, product_id } }) {
  const { t } = await getTranslations(locale);

  // const {product} = await get_product_details(product_id);
  const product = products.find((product) => {
    product.id === product_id;
    return product;
  });

  const all_product_images = [
    {
      url: product.photos.card,
      alt: product.photos.alt,
    },
    product.photos.default.map((e) => ({ url: e, alt: product.photos.alt })),
    product.photos.colors
      .map((e) => e.photos)
      .reduce((all, e) => {
        all.push(e);
        return all;
      }, [])
      .map((e) => ({ url: e, alt: product.photos.alt })),
  ];

  return {
    title: t("placeholders.page-#", { title: product.names[locale] }),
    description: product.descriptions[locale],
    openGraph: {
      title: product.names[locale],
      description: product.descriptions[locale],
      url: `${FRONT_URL}/${locale}/products/${product.id}`,
      locale,
      images: all_product_images,
      siteName: t("app.name"),
      authors: "Zodiac, Zodiac Wear",
      tags: product.tags,
    },
    twitter: {
      title: product.names[locale],
      description: product.descriptions[locale],
      card: "summary_large_image",
      images: all_product_images,
      creator: "Zodiac, Zodiac Wear",
      site: FRONT_URL,
    },
  };
}

export default async function ProductDetails({
  params: { locale, product_id },
}) {
  const { t } = await getTranslations(locale);
  const product = products.find((product) => {
    product.id === product_id;
    return product;
  });
//   const { product, other } = await get_product_details(product_id);

  if (!product.id) {
    notFound();
  }

  return (
    <Container maxWidth="xl">
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-10">
        {/* Product Images */}
        <article>
          <ProductImagesCarousel product={product} />
        </article>

        {/* Product Desc */}
        <article className="col-span-1 space-y-6 pb-8">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                {t("navigation.home")}
              </Link>

              <Link
                underline="hover"
                color="inherit"
                href={`/${toLower(product.super_category.names.en)}`}
              >
                {product.super_category.names[locale]}
              </Link>

              <Link
                className="capitalize"
                underline="hover"
                color="inherit"
                href={`/categories/${product.category.id}`}
              >
                {product.category.names[locale]}
              </Link>

              <Link
                className="capitalize"
                underline="hover"
                color="inherit"
                href={`/categories/${product.category.id}/${product.sub_category.id}`}
              >
                {product.sub_category.names[locale]}
              </Link>

              <Typography className="capitalize font-bold" color="text.primary">
                {product.names[locale]}
              </Typography>
            </Breadcrumbs>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-4xl">{product.names[locale]}</h2>
            <ProductStats is_new={product.stats.is_new} />
          </div>

          {/* Price */}
          <PriceProductDetails
            price={product.variants[0].prices.normal}
            discount={product.variants[0].prices.discount}
          />

          <p className="text-sm text-SecondaryText">
            {product.descriptions[locale]}
          </p>

          {/* Stock */}
          <StockProductDetails />

          {/* Select Size */}
          <ProductSelectSize
            product_variants={product.variants}
            locale={locale}
          />

          {/* Quantity Counter / Add to cart*/}
          <ProductDetailsQuantity />

          {/* Compare / Add to Wishlist*/}
          <div className="flex items-center gap-4">
            <ProductCompareButton product_id={product.id} />
            <ProductAddToWishlist product_id={product.id} />
          </div>

          <Divider />

          <article className="space-y-2">
            <div className="flex items-center gap-2">
              <h2>{t("fields.category")}:</h2>
              <h2 className="text-SecondaryText capitalize">
                {product.category.names[locale]} /{" "}
                {product.sub_category.names[locale]}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <h2>{t("fields.share")}:</h2>
              <ShareButtons product_id={product_id} locale={locale} />
            </div>
          </article>
        </article>
      </section>

      <Divider />

      <ProductInfoTabs product={product} locale={locale}>
        <section className="grid grid-cols-3 gap-4 py-8">
          {/* Description // passing it as children for ssr */}
          {product.info_keys.map((info, i) => (
            <div key={i} className="col-span-1">
              <h3 className="font-bold text-xl capitalize">
                {info.key.names[locale]}:
              </h3>

              <span className="capitalize text-SecondaryText">
                {info.values[locale]}
              </span>
            </div>
          ))}
        </section>
      </ProductInfoTabs>

      <Divider />

      <ProductRelatedProductsSection related_products={other} locale={locale} />
    </Container>
  );
}
