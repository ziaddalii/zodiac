"use server";
import {BRANCHES} from "../constants";

export async function get_branches(){
    try {
        const response = await fetch(BRANCHES, {cache: "no-cache"});
        
        const body = await response.json();
        
        if (!body.success) {
            throw new DOMException();
        }
        
        return body.data;
    } catch (e) {
        return {
            data: [],
        };
    }
}