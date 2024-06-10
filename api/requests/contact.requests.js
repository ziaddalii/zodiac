import {CONTACT_US} from "../constants";
import {get_request_errors} from "../../util/common";

export async function post_contact_us(contact_form) {
    try {

        const response = await fetch(CONTACT_US, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact_form),
        });

        const body = await response.json();

        if (!body.success) {
            throw new DOMException(get_request_errors(body));
        }

    } catch (e) {
        return e.message;
    }

}
