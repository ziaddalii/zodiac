import { Container } from "@mui/material";
import SectionHeader from "../common/headers/section.headers";
import ProductCard from "../common/cards/product.card";
import getTranslations from "@/i18n-next";

export default async function BestSellersSection({ best_sellers, locale }) {
  const { t } = await getTranslations(locale);

  return (
    <Container maxWidth="xl">
      <SectionHeader
        title={t("fields.best-sellers")}
        button={t("fields.see-all")}
        link={"/products/all/best-sellers?page=1"}
      />

      <section className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
        {best_sellers.map((item, i) => (
          <div key={item.id} data-aos-delay={i * 50} data-aos="fade-up">
            <ProductCard  item={item} locale={locale} />
          </div>
        ))}
      </section>
    </Container>
  );
}
