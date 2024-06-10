"use server";

import { get_request_errors } from "../../util/common";
import { REGISTER } from "../constants";

export async function post_register(register_form, locale){
    try {
        const response = await fetch(REGISTER, {
            headers: {
                accept: "application/json",
            },
            cache: "no-cache",
            method: "POST",
            body: register_form,
        });
        
        const body = await response.json();
        
        if (!body.success) {
            throw new DOMException(get_request_errors(body, locale));
        }
        
        return body;
    } catch (e) {
        console.log(e);
        
        return e.message;
    }
}