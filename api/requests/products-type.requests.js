"use server";
import {PRODUCTS_TYPE} from "../constants";
export async function get_products_type_page(products_type, page, sort){
    try {
        const response = await fetch(PRODUCTS_TYPE(products_type, page , sort), {cache: "no-cache"});
        
        const body = await response.json();
        
        if (!body.success) {
            throw new DOMException();
        }
        return body.data;
    } catch (e) {
            console.log(e);
        return {
            data:[],
        };
    }
}