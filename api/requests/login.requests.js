"use server";

import { LOGIN } from "../constants";
import { get_request_errors } from "../../util/common";

export async function post_login(login_form, locale){
    try {
        const response = await fetch(LOGIN, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login_form),
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