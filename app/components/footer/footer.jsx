import {Container} from "@mui/material";
import Logo from "/public/logo-black-alt.png";
import NearMeIcon from "@mui/icons-material/NearMe";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Link from "next/link";
import getTranslations from "@/i18n-next";
import dayjs from "dayjs";
import Image from "next/image";
import { sampleSize } from "lodash-es";

export default async function Footer({ locale, footer_data, custom_scripts }) {
  const { t } = await getTranslations(locale);

  const footer_list = [
    {
      heading: t("fields.our-branches"),
      list: sampleSize(footer_data.branches, 6).map((branch) => ({
        name: branch.names[locale],
        link: `branches#${branch.id}`,
    })),
    },
    {
      heading: t("fields.follow-us"),
      list: [
        {
          name: "Facebook",
          link: "/",
        },
        {
          name: "Instagram",
          link: "/",
        },
        {
          name: "TikTok",
          link: "/",
        },
        {
          name: "X",
          link: "/",
        },
      ],
    },
    {
      heading: t("fields.useful-links"),
      list: [
        {
          name: t("navigation.about-us"),
          link: "/about",
        },
        {
          name: t("navigation.contact-us"),
          link: "/contact",
        },
        {
          name: t("navigation.faq"),
          link: "/faq",
        },
        {
          name: t("navigation.privacy-policy"),
          link: "/privacy",
        },
        {
          name: t("navigation.terms-of-services"),
          link: "/terms",
        },
        {
          name: t("navigation.shipping-delivery"),
          link: "/shipping",
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#fbfbfb]">
    {custom_scripts.map((e, i) => (
      <div key={`scripts-footer-${i}`} id={`scripts-footer-${i}`} dangerouslySetInnerHTML={{__html: e.content}}></div>
  ))}
      <Container maxWidth="xl">
        <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-8 py-8">
          <div className="col-span-2 space-y-4">
            <Image width={500} height={60} className="h-10 w-fit" alt="zodiac-logo" src={Logo.src} />

            <p className="text-SecondaryText">{t("fields.app-description")}</p>

            <ul className="space-y-2">
              <li className="text-SecondaryText text-sm">
                <NearMeIcon />{" "}
                <span>سيتي ستارز : الدور الرابع مبنى 2 محل 4185</span>
              </li>

              <li className="text-SecondaryText text-sm">
                <SmartphoneIcon /> <span>+201220754444</span>
              </li>

              <li className="text-SecondaryText text-sm">
                <LocalPostOfficeIcon /> <span>wearzodiac@hotmail.com</span>
              </li>
            </ul>
          </div>

          {footer_list.map((footer, i) => (
            <div key={i} className="col-span-1 space-y-2">
              <h2 className="text-xl" key={i}>
                {footer.heading}
              </h2>
              <ul className="space-y-1">
                {footer.list.map((item, n) => (
                  <li
                    key={n}
                    className="text-SecondaryText transition-all hover:text-black"
                  >
                    <Link href={item.link}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/*All Rights Section*/}
        <section className="sm:flex sm:justify-between mx-auto sm:items-center py-4">
          <p className="text-lg sm:text-start text-center">
            Powered by{" "}
            <Link target="_blank" className="font-bold" href="https://icon-ts.com/">
              Icon
            </Link>
          </p>
          <p className="sm:text-start text-center">Copyright © {dayjs().format("YYYY")} Zodiac</p>
        </section>

      </Container>

    </footer>
  );
}
