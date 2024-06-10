import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {build_metadata} from "@/[locale]/layout";
import {get_categories} from "../../../api/requests/category.requests";
import SuperCategoryCard from "@/components/common/cards/super-category";
import {FRONT_URL} from "../../../api/constants";

export async function generateMetadata({
  params: { locale },
}) {
  const { t } = await getTranslations(locale);

  const super_categories = await get_categories();

  const all_super_categories = super_categories.map((e) => e.names[locale]);
  const categories = super_categories.map((e) => e.categories);
  const all_categories = categories.flat().map((e) => e.names[locale]);
  const random_photo_card = categories[(Math.random() * (categories.length - 1))]?.photos.card ?? "";
  const all_sub_categories = super_categories.map((e) => e.categories).flat().map((e) => e.sub_categories).flat().map((e) => e.names[locale]);

  const all_names = [all_super_categories, all_categories, all_sub_categories].join(", ");

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.all-categories") }),
    keywords: all_names,
    description: all_names,
    openGraph: {
      title: all_names,
      description: all_names,
      url: `${FRONT_URL}/${locale}/categories`,
      locale,
      images: {
        url: random_photo_card,
        alt: all_names,
      },
      siteName: t("app.name"),
      tags: all_names,
    },
    twitter: {
      title: all_names,
      description: all_names,
      card: "summary_large_image",
      images: {
        url: random_photo_card,
        alt: all_names,
      },
      site: FRONT_URL,
    },
  }
  );
}

export default async function CategoryPage(props) {
  const { locale } = props.params;

  const categories_data = await get_categories();

  return (
    <section className="pb-8">
      <Container maxWidth="xl">
        {
            categories_data.map((super_category) => {
                return(
                    <SuperCategoryCard key={super_category.id} locale={locale} super_category={super_category}/>
                );
            })
        }
      </Container>
    </section>
  );
}
