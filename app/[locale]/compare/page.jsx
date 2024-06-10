import {Box, Breadcrumbs, Container} from "@mui/material";
import getTranslations from "@/i18n-next";
import {build_metadata} from "@/[locale]/layout";
import dynamic from "next/dynamic";
import Link from "next/link";

const CompareTable = dynamic(
  () => import("@/components/compare/compare-table"),
  {
    ssr: false,
  }
);

export async function generateMetadata({ params: { locale } }) {

  const { t } = await getTranslations(locale);

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.compare") }),
  });
}

export default async function ComparePage(props) {
    const { locale } = props.params;

    const { t } = await getTranslations(locale);

  return (
    <Box component="main">

      <article className="bg-black py-8 text-center space-y-4">

        <h2 className="text-white text-5xl">{t("fields.compare")}</h2>

        <Breadcrumbs
          className="mx-auto"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              justifyContent: "center",
            },
          }}
          aria-label="breadcrumb"
        >
          <Link
            className="hover:opacity-75 transition-all uppercase text-sm"
            href="/"
          >
            {t("navigation.home")}
          </Link>
          <h3 className="text-white uppercase text-sm">
            {t("fields.compare")}
          </h3>
        </Breadcrumbs>

      </article>

      <Container maxWidth="xl" component="section" className="py-8">
        <CompareTable locale={locale} />
      </Container>

    </Box>
  );
}
