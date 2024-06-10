import PinnedCard from "@/components/common/cards/pinned.card";
import { Container } from "@mui/material";

export default function PinnedSection({ scatter, locale }) {
  return (
    <Container maxWidth="xxl" className="md:my-0 mt-14 !mb-24">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 gap-32 lg:px-0 px-4">
        {scatter.map((item, i) => (
          <div
            data-aos-delay={i * 50}
            data-aos="fade-up"
            key={i}
            className={`${i === 0 && "md:mt-28"} ${i === 1 && "md:mt-56"} mb-10 col-span-1`}
          >
            <PinnedCard item={item} locale={locale} />
          </div>
        ))}
      </div>
    </Container>
  );
}
