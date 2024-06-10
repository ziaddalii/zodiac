"use server";
import {WISHLIST} from "../constants";
import {cookies} from "next/headers";
import {get_request_errors} from "../../util/common";

export async function get_wishlist() {
    const token = await cookies().get("token");
    try {

      const response = await fetch(WISHLIST, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      });

      const body = await response.json();
  
      if (body.success !== true) {
        throw new DOMException();
      }
  
      return body.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }


  export async function post_update_wishlist(payload, locale){
    const token = await cookies().get("token");
    
    try {
        const response = await fetch(WISHLIST, {
            cache: "no-cache",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token?.value}`,
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
        
        return e.message;
    }
}