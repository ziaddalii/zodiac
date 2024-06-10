"use server";

import {ABOUT} from "../constants";

export async function get_about(){
    try {
        const response = await fetch(ABOUT, {cache: "no-cache"});
        
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