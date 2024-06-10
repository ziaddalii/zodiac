import { Container } from "@mui/material";
import React from "react";
import SectionHeader from "../common/headers/section.headers";
import ProductCard from "../common/cards/product.card";
import getTranslations from "@/i18n-next";

export default async function NewArrivalsSection({ new_arrivals, locale }) {
  const { t } = await getTranslations(locale);
  return (
    <Container maxWidth="xl">
      <SectionHeader
        title={t("fields.new-arrivals")}
        button={t("fields.see-all")}
        link={"/products/all/new-arrivals?page=1"}
      />

      <section className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
        {new_arrivals.map((item, i) => (
          <div key={item.id} data-aos-delay={i * 50} data-aos="fade-up">
            <ProductCard item={item} locale={locale} />
          </div>
        ))}
      </section>
    </Container>
  );
}
