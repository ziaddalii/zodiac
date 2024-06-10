import {build_metadata} from "@/[locale]/layout";
import PagesTitle from "./../../components/common/headers/pages.titles";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {get_terms} from "../../../api/requests/terms.requests";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);
  const terms_data = await get_terms();

  return await build_metadata(locale, {
    title: t("placeholders.page-#", {
      title: t("navigation.terms-of-services"),
    }),
    keywords: terms_data.tags,
  });
}

export default async function TermsPage({ params: { locale } }) {
  const { t } = await getTranslations(locale);
  const terms_data = await get_terms();

  return (
    <Container maxWidth="xl">

      {/* Page Title */}
      <PagesTitle title={t("navigation.terms-of-services")} />

      {/* Content */}
      <section className="pb-8 prose lg:prose-xl w-full" dangerouslySetInnerHTML={{__html:terms_data.contents[locale]}}></section>

    </Container>
  );
}
