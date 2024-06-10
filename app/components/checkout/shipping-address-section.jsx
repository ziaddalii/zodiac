"use client";
import {Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import CartLocationForm from "../common/forms/cart-location.forms";
import {update_address_id, update_other_address} from "./checkout-submit-section";
import {useCartList} from "@/store/cart-list";

const ShippingAddressSection = ({locations, checkout, locale}) => {

    const [current_province, set_current_province] = useState();
    const {set_total, set_fees} = useCartList();
    const [disabled, setDisabled] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const {t} = useTranslation();
    
    useEffect(() => {
        // Check if the "other address" option is selected and set disabled accordingly
        if (selectedValue === "other") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        
    }, [selectedValue]);
    
    useEffect(() => {
        set_total(checkout.total);
        if (current_province && current_province.fees) {
            set_fees(current_province.fees);
        }
    }, [current_province]);
    
    return (
        <article className="col-span-1 border border-secondary p-4 space-y-4">
            <h2 className="text-lg">{t("fields.shipping-address")}</h2>
            
            <FormControl>

                <RadioGroup
                    onChange={(_, address_id) => {
                        setSelectedValue(address_id);
                        
                        if (address_id === "other") {
                            return;
                        }
    
                        const address_obj = checkout.addresses.find(
                            (e) => e.id.toString() === address_id
                        );
    
                        set_current_province(address_obj.province);
                        update_address_id(address_id);
                        update_other_address(null);
                    }}
                    className="space-y-2"
                    aria-labelledby="address group"
                    name="address group"
                >
                    {checkout.addresses.map((address) => (
                            <div key={`address-${address.id}-${address.addressId}`}>
                                
                                <FormControlLabel
                                    className="capitalize"
                                    value={address.id}
                                    control={<Radio/>}
                                    label={address.name}/>
                                
                                <p className="text-textSecondary text-xs capitalize">
                                    {address.country.names[locale]} / {address.province.names[locale]} / {address.city.names[locale]} / {address.street_name} / {address.building_name_or_no}
                                </p>
                            
                            </div>
                        ))
                    }
                    <div>
                        <FormControlLabel value="other" control={<Radio/>} label={t("fields.other-address")}/>
                    </div>
                </RadioGroup>
            </FormControl>
            
            <Divider/>
            
            <CartLocationForm locations={locations} disabled={disabled}/>
        
        </article>
    );
};

export default ShippingAddressSection;
