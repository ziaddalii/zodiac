"use server";
import {COUPON} from "../constants";
import {get_request_errors} from "../../util/common";
import {cookies} from "next/headers";

export async function post_coupon(payload, locale) {
    const token = await cookies().get("token");
  
    try {
      const response = await fetch(COUPON, {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const body = await response.json();
      if (body.success !== true) {
        throw new DOMException(get_request_errors(body, locale));
      }else{
        return body.data;
      }
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
