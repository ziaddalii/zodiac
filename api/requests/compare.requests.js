"use server";

import {COMPARE} from "../constants";
import {get_request_errors} from "../../util/common";

export async function post_compare(payload, locale) {
    try {
        const response = await fetch(COMPARE, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const body = await response.json();

        if (body.success !== true) {
            throw new DOMException(get_request_errors(body, locale));
        }

        return body.data;
    } catch (e) {
        console.log(e);
        return { products: [], brands: [], in_stock: [], variants: [] };
    }
}