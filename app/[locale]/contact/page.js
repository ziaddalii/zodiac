import {build_metadata} from "@/[locale]/layout";
import ContactUsForm from "@/components/common/forms/contact-us.forms";
import PagesTitle from "./../../components/common/headers/pages.titles";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.contact-us") }),
  });
}

export default async function ContactPage({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  return (
    <Container maxWidth="md">

      {/* Page Title */}
      <PagesTitle title={t("navigation.contact-us")} />

      {/* Content */}
      <section className="pb-8">
        <ContactUsForm locale={locale}/>
      </section>

    </Container>
  );
}
