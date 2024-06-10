"use client";
import Image from "next/image";
import ShippingImage1 from "/public/shipping/shipping-1.jpg";
import ShippingImage2 from "/public/shipping/shipping-2.jpg";
import {useTranslation} from "react-i18next";

export default function ProductShippingSection() {
  const { t } = useTranslation();
  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 py-4">
      <article className="grid-cols-2 gap-4 lg:grid hidden">
        <Image src={ShippingImage1} alt="shipping and delivery" />
        <Image src={ShippingImage2} alt="shipping and delivery" />
      </article>
      <article className="text-SecondaryText">
        {t("fields.product-shipping")}
      </article>
    </section>
  );
}
