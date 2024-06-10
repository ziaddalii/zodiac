import {build_metadata} from "@/[locale]/layout";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {get_about} from "../../../api/requests/about.requests";
import PagesTitle from "./../../components/common/headers/pages.titles";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  const about_data = await get_about();

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.about-us") }),
    keywords: about_data.tags,
  });

}

export default async function AboutPage({ params: { locale } }) {

  const { t } = await getTranslations(locale);

  const about_data = await get_about();

  return (
    <Container maxWidth="xl">

      {/* Page Title */}
      <PagesTitle title={t("navigation.about-us")} />

      {/* Content */}
      <section className="pb-8 prose lg:prose-xl w-full" dangerouslySetInnerHTML={{__html:about_data.contents[locale]}}></section>

    </Container>
  );
}
