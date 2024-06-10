"use server";
import {TERMS} from "../constants";
export async function get_terms(){
    try {
        const response = await fetch(TERMS, {cache: "no-cache"});
        
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