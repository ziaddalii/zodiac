import {build_metadata} from "@/[locale]/layout";
import PagesTitle from "./../../components/common/headers/pages.titles";
import getTranslations from "@/i18n-next";
import {Accordion, AccordionDetails, AccordionSummary, Container} from "@mui/material";
import {get_faqs} from "../../../api/requests/faqs.requests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export async function generateMetadata({ params: { locale } }) {
  const { t } = await getTranslations(locale);

  return await build_metadata(locale, {
    title: t("placeholders.page-#", { title: t("navigation.faq") }),
  });

}

export default async function FaqPage({ params: { locale } }) {

  const { t } = await getTranslations(locale);

  const faqs_data = await get_faqs();

  return (
    <Container maxWidth="xl">

      {/* Page Title */}
      <PagesTitle title={t("navigation.faq")} />

      {/* Content */}
      <section className="pb-8 grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2">
        {" "}
        {faqs_data.map((faq, i) => (
          <div key={i} className="mb-4 border-bo col-span-1">
          <Accordion sx={{boxShadow:"0"}}>
              <AccordionSummary
              sx={{
                padding: "16px",
                margin: "0",
                background: "#f7f7f7",
                border: "none",
                fontWeight:"bold",
              }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
              {faq.questions[locale]}
              </AccordionSummary>
              <AccordionDetails>
              {faq.answers[locale]}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </section>
    </Container>
  );
}
