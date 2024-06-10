import {build_metadata} from "@/[locale]/layout";
import PagesTitle from "./../../components/common/headers/pages.titles";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {get_privacy} from "../../../api/requests/privacy.requests";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  const privacy_data = await get_privacy();

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.privacy-policy") }),
    keywords:privacy_data.tags,
  });
}

export default async function PrivacyPage({ params: { locale } }) {

  const { t } = await getTranslations(locale);

  const privacy_data = await get_privacy();

  return (
    <Container maxWidth="xl">

      {/* Page Title */}
      <PagesTitle title={t("navigation.privacy-policy")} />

      {/* Content */}
        <section className="pb-8 prose lg:prose-xl w-full" dangerouslySetInnerHTML={{__html:privacy_data.contents[locale]}}></section>

    </Container>
  );
}
