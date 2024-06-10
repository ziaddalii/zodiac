"use server";

import {cookies} from "next/headers";
import {CHECKOUT} from "../constants";

export async function get_checkout() {
  const token = await cookies().get("token");
  try {
    const response = await fetch(CHECKOUT, {
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;
  } catch (e) {

    return {
      cart: [],
      total: 0,
      addresses: [],
    };
  }
}
