"use server";
import {PRIVACY} from "../constants";
export async function get_privacy(){
    try {
        const response = await fetch(PRIVACY, {cache: "no-cache"});
        
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