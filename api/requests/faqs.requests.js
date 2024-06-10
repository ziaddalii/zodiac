"use server";
import {FAQS} from "../constants";
export async function get_faqs(){
    try {
        const response = await fetch(FAQS, {cache: "no-cache"});
        
        const body = await response.json();
        
        if (!body.success) {
            throw new DOMException();
        }
        
        return body.data;
    } catch (e) {
            console.log(e);
        return {
            data:{},
        };
    }
}