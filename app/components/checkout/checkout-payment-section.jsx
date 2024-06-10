"use client";

import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import { update_payment_method } from "./checkout-submit-section";

export default function CheckoutPaymentSection() {
    
    const {t} = useTranslation();
    const [payment_method, set_payment_method] = useState("0");
    
    return (
        <FormControl className="!mt-4 flex gap-4 items-center w-full">
            <h2 className="font-bold">{t("fields.payment-method")}</h2>

            <RadioGroup
                onChange={(event, value) => {
                    set_payment_method(value);
                    update_payment_method(value);
                }}
                defaultValue={payment_method}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="0" control={<Radio/>} label={t("fields.cash")}/>
                <FormControlLabel disabled value="1" control={<Radio/>} label={t("fields.visa")}/>
            </RadioGroup>
            
        </FormControl>
    );
}
