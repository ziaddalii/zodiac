"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Fade, ListItem, styled, useTheme} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Link from "next/link";
import CustomAccordion from "../common/accordions/accordion";
import {useTranslation} from "react-i18next";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Fade timeout={500} in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        className="transition-all"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    </Fade>
  );
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    "&.Mui-selected": {
      background: `${theme.palette.secondary.main}`,
      fontWeight: "bold",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavTabs({navbar_data, locale}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {t} = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // "faq": "الأسئلة الشائعة",
  // "contact-us": "اتصل بنا",
  // "branches": "الفروع",
  // "about-us":"عننا",
  // "privacy-policy": "سياسة الخصوصية",
  // "terms-of-services": "شروط الخدمة",
  const nav_links = [
    {
      route: "/",
      name: t("fields.home"),
    },
    {
      route: "/about",
      name: t("navigation.about-us"),
    },
    {
      route: "/branches",
      name: t("navigation.branches"),
    },
    {
      route: "/shipping",
      name: t("navigation.shipping-delivery"),
    },
    {
      route: "/privacy",
      name: t("navigation.privacy-policy"),
    },
    {
      route: "/faq",
      name: t("navigation.faq"),
    },
    {
      route: "/terms",
      name: t("navigation.terms-of-services"),
    },
    {
      icon: <ShoppingCartOutlinedIcon />,
      route: "/auth/account/cart",
      name: t("fields.cart"),
    },
    {
      icon: <FavoriteBorderIcon />,
      route: "/auth/account/wishlist",
      name: t("fields.wishlist"),
    },
    {
      icon: <CompareArrowsIcon />,
      route: "/compare",
      name: t("fields.compare"),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab className="w-1/2" label="Menu" {...a11yProps(0)} />
          <StyledTab className="w-1/2" label="Categories" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <ul className="divide-y-[1px] divide-secondary">
          {nav_links.map((link, i) =>
            link.dropdown ? (
              // Accordion Nav link
              <CustomAccordion
                summary={
                  <Link
                    className="block w-full p-4 hover:bg-secondary"
                    href={link.route}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "14px",
                    }}
                  >
                    {link.name}
                  </Link>
                }
                details={link.dropdown_list.map((item, i) =>
                  item.dropdown ? (
                    //   Child Nav Accordion
                    <CustomAccordion
                      summary={
                        <Typography
                          component={Link}
                          className="block w-full p-4 hover:bg-secondary"
                          href={item.route}
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "14px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      details={item.dropdown_list.map((item, i) => (
                        <ListItem
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "14px",
                          }}
                          key={i}
                        >
                          <Link href={item.route}>{item.name}</Link>
                        </ListItem>
                      ))}
                      key={i}
                    ></CustomAccordion>
                  ) : (
                    // Not Accordion Nav item
                    <ListItem
                      sx={{
                        padding: "0 1rem",
                        fontSize: "14px",
                        color: theme.palette.text.secondary,
                      }}
                      key={i}
                    >
                      <Link href={item.route}>{item.name}</Link>
                    </ListItem>
                  )
                )}
                sx={{
                  boxShadow: "none",
                  "& .MuiButtonBase-root": {
                    minHeight: "0!important",
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "0!important",
                  },
                }}
                className="p-4"
                key={i}
              ></CustomAccordion>
            ) : (
              // Not Accordion Nav item
              <li className="flex gap-2 items-center justify-start" key={i}>
                <Link
                  className="w-full block p-4 hover:bg-secondary"
                  href={link.route}
                >
                  {" "}
                  {link.icon ?? link.icon} {link.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
  <ul className="divide-y-[1px] divide-secondary">
    {navbar_data.super_categories.map((super_category, i) => (
      <CustomAccordion
        summary={
          <Link
            className="block w-full capitalize p-4 hover:bg-secondary"
            href={`/${super_category.names.en.toLowerCase()}`}
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "14px",
            }}
          >
            {super_category.names[locale]}
          </Link>
        }
        details={super_category.categories.map((category, j) => (
          <CustomAccordion
            summary={
              <Typography
                component={Link}
                className="block w-full capitalize p-4 hover:bg-secondary"
                href={`${super_category.names.en.toLowerCase()}/${category.id}`}
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "14px",
                }}
              >
                {category.names[locale]}
              </Typography>
            }
            details={category.sub_categories.map((sub_category, k) => (
              <ListItem
              className="w-full"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "14px",
                }}
                key={k}
              >
                <Link className="w-full capitalize" href={`${super_category.names.en.toLowerCase()}/${category.id}/${sub_category.id}`}>{sub_category.names[locale]}</Link>
              </ListItem>
            ))}
            key={j}
          ></CustomAccordion>
        ))}
        sx={{
          boxShadow: "none",
          "& .MuiButtonBase-root": {
            minHeight: "0!important",
          },
          "& .MuiAccordionSummary-content": {
            margin: "0!important",
          },
        }}
        className="p-4"
        key={i}
      ></CustomAccordion>
    ))}
  </ul>
</CustomTabPanel>

    </Box>
  );
}
