import {Button, Container} from "@mui/material";
import getTranslations from "@/i18n-next";


export default async function VideoSection({locale}) {
  const {t} = await getTranslations(locale);
  return (
    <Container maxWidth="xl">
      <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="col-span-1 space-y-4">
          <span className="text-SecondaryText block">{t("fields.experience-the-transformative")}</span>
          <h2 className="text-5xl font-thin w-[80%]">
            {t("fields.fashion-in-motion")}
          </h2>
          <p className="text-SecondaryText">
          {t("fields.dive-into-our-world-of-fashion")}

          </p>

          <Button href="new-arrivals?page=1" variant="outlined">{t("fields.view-more")}</Button>

        </div>

        <div>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/7m16dFI1AF8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </Container>
  );
}
