"use client";
import {useTranslation} from "react-i18next";
import ReviewCard from "../common/cards/review.card";

export default function ProductReviewsSection({reviews}) {
  const {t} = useTranslation();

  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-4">

      {/*Reviews */}
      <article className="col-span-2 space-y-8">
        <h2 className="font-bold">{t("fields.reviews")}</h2>
        {
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review}/>
          ))
        }
      </article>

      {/*Review Form */}
      {/*<article className="col-span-1">*/}
      {/*  <h2 className="font-bold">{t("fields.add-review")}</h2>*/}
      {/*  <ProductReviewForm/>*/}
      {/*</article>*/}

    </section>
  );
}
