"use server";
import { SEARCH_PRODUCTS } from "../constants";
import { get_request_errors } from "../../util/common";

export async function post_search(search_data, locale){
    try {
        const response = await fetch(SEARCH_PRODUCTS, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(search_data),
        });
        
        const body = await response.json();
        
        if (body.success !== true) {
            throw new DOMException(get_request_errors(body, locale));
        }
        
        return body.data;
    } catch (e) {
            console.log(e);
        return e.message;
    }
}