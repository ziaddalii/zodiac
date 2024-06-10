"use server";
import {PRODUCT_DETAILS} from "../constants";

export async function get_product_details(product_id){
    try {
        const response = await fetch(PRODUCT_DETAILS(product_id), {cache: "no-cache"});
        
        const body = await response.json();
        
        if (!body.success) {
            throw new DOMException();
        }
        return body.data;
    } catch (e) {
            console.log(e);
        return {
            product:{
                names: {},
                photos: {
                    default: [],
                    colors: [],
                },
            },
            other: [],
        };
    }
}
