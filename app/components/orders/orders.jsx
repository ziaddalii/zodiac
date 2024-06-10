"use client";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CurrentOrders from "./current-orders";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import OrdersHistory from "./history-orders";
import {useTranslation} from "react-i18next";
import {useCurrentOrders, useOrdersHistory} from "@/store/orders";
import {get_current_orders, get_history_orders} from "../../../api/requests/orders.requests";
import { LoadingLayout } from "../layout/loading.layout";

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function Orders({current_orders, orders_history, locale}) {
    const {t} = useTranslation();
    const [value, setValue] = useState(0);
    const [currentIsLoading, setCurrentIsLoading] = useState(true);
    const [historyIsLoading, setHistoryIsLoading] = useState(true);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // CURRENT ORDERS STORE
    const {
        set_current_orders,
        list: current_orders_list,
        current_page: current_orders_page,
        set_current_page: set_current_orders_page,
        set_last_page: set_current_orders_last_page,
    } = useCurrentOrders();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const current_orders = await get_current_orders(
                    current_orders_page,
                );
                set_current_orders(current_orders.data);

                // Saving Page Data in Store
                set_current_orders_page(current_orders.current_page);
                set_current_orders_last_page(current_orders.last_page);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData().finally(() => setCurrentIsLoading(false));
    }, [current_orders_page]);

    // ORDERS HISTORY STORE
    const {
        set_orders_history,
        list: orders_history_list,
        current_page: orders_history_page,
        set_current_page: set_orders_history_page,
        set_last_page: set_orders_history_last_page,
    } = useOrdersHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders_history = await get_history_orders(
                    orders_history_page,
                );
                set_orders_history(orders_history.data);

                // Saving Page Data in Store
                set_orders_history_page(orders_history.current_page);
                set_orders_history_last_page(orders_history.last_page);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData().finally(() => setHistoryIsLoading(false));
    }, [orders_history_page]);
    return (
        
            <Box sx={{width: "100%"}}>
                <Box
                display="flex" justifyContent="center" width="100%"
                    sx={{borderBottom: 1, marginBottom: "1rem", borderColor: "divider"}}
                >
                    <Tabs
                        value={value}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                            ".MuiTabs-indicator": {
                                top: "0",
                            },
                        }}
                    >
                        <Tab
                        sx={{fontSize: { xs: "14px", md: "16px"}}}
                            label={`${t("fields.current-orders")} (${current_orders_list.length})`}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label={`${t("fields.orders-history")} (${orders_history_list.length})`}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>

                {/*CURRENT ORDERS*/}
                <CustomTabPanel value={value} index={0}>
                    <LoadingLayout loading={currentIsLoading} isEmpty={current_orders_list.length === 0} empty={<Box
                        minHeight="50vh"
                        className="flex flex-col flex-1 gap-4 justify-center items-center"
                    >
                        <ErrorOutlineIcon color="primary" sx={{fontSize: "8rem"}}/>
                        <Typography variant="h6">{t("messages.empty-orders")}</Typography>
                    </Box>}>
                
                            <CurrentOrders locale={locale} current_orders={current_orders_list}/>
                    </LoadingLayout>
                </CustomTabPanel>

                {/*ORDERS HISTORY*/}
                
                <CustomTabPanel value={value} index={1}>
                    <LoadingLayout loading={historyIsLoading} isEmpty={orders_history_list.length === 0} empty={<Box
                        minHeight="50vh"
                        className="flex flex-col flex-1 gap-4 justify-center items-center"
                    >
                        <ErrorOutlineIcon color="primary" sx={{fontSize: "8rem"}}/>
                        <Typography variant="h6">{t("messages.empty-orders")}</Typography>
                    </Box>}>
                            <OrdersHistory locale={locale} orders_history={orders_history_list}/>
                    </LoadingLayout>
                 </CustomTabPanel>
            </Box>

    );
}

export default Orders;
