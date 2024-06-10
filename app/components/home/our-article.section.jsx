import {Container} from "@mui/material";
import getTranslations from "@/i18n-next";
import dynamic from "next/dynamic";

const ArticlesCarousel = dynamic(() => import("@/components/common/carousels/articles.carousels"), {ssr: false});

export default async function OurArticleSection({articles, locale}) {
  const {t} = await getTranslations(locale);
  return (
    <Container maxWidth="xl">

      <section className="my-12 space-y-4" data-aos-delay={50} data-aos="fade-up">

        <h2 className="text-center text-4xl">{t("fields.our-articles")}</h2>

        <p className="text-center max-w-[600px] text-SecondaryText mx-auto">
          {t("fields.our-articles-desc")}
        </p>

        <ArticlesCarousel articles={articles} locale={locale}/>

      </section>

    </Container>
  );
}
