"use server";
import {SHIPPING} from "../constants";
export async function get_shipping(){
    try {
        const response = await fetch(SHIPPING, {cache: "no-cache"});
        
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