"use client";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import ProductReviewsSection from "./product-reviews.section";
import ProductShippingSection from "./product-shipping.section";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function ProductInfoTabs({children, product, locale}) {
    const {t} = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Box display="flex" justifyContent="center" width="100%">
                <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="product tabs"
                    indicatorColor="accent"
                    allowScrollButtonsMobile
                    sx={{
                        ".MuiTabs-indicator": {
                            top: "0",
                            backgroundColor:"black",
                        },
                    }}
                >
                    <Tab sx={{fontSize: "1rem"}} label={t("fields.description")} {...a11yProps(0)} />
                    <Tab sx={{fontSize: "1rem"}} label={t("fields.reviews")} {...a11yProps(1)} />
                    <Tab sx={{fontSize: "1rem"}} label={t("fields.shipping-delivery")} {...a11yProps(2)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                {children}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <ProductReviewsSection reviews={product.reviews} t={t}/>,
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <ProductShippingSection/>
            </CustomTabPanel>

        </Box>
    );
}


