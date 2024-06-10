import { Container } from "@mui/material";
import ServiceCard from "../common/cards/service.card";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import getTranslations from "@/i18n-next";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import SecurityIcon from "@mui/icons-material/Security";
export default async function OurServicesSection({ locale }) {
  const { t } = await getTranslations(locale);

  const services = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: "56px" }} />,
      title: t("fields.free-shipping"),
      desc: t("fields.get-items-delivered"),
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "56px" }} />,
      title: t("fields.support-team"),
      desc: t("fields.assistance-available"),
    },
    {
      icon: <CreditScoreIcon sx={{ fontSize: "56px" }} />,
      title: t("fields.online-payments"),
      desc: t("fields.seamless-transactions"),
    },
    {
      icon: <SecurityIcon sx={{ fontSize: "56px" }} />,
      title: t("fields.safe-secure"),
      desc: t("fields.shop-with-confidence"),
    },
  ];
  return (
    <section className="py-12">
      <Container maxWidth="xl">
        <div className="grid gap-4 gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {services.map((service, i) => (
            <div key={i} data-aos-delay={i * 50} data-aos="fade-up">
              <ServiceCard  service={service} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
