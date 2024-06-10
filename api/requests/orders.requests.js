"use server";
import { cookies } from "next/headers";
import {get_request_errors} from "../../util/common";

import { CURRENT_ORDERS, HISTORY_ORDERS, UPDATE_ORDERS, CHECKOUT_ORDERS, RETURN_ORDERS } from "../constants";

export async function get_current_orders(page) {
  const token = await cookies().get("token");
  try {
    const response = await fetch(CURRENT_ORDERS(page), {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;
  } catch (e) {
    console.log(e);
    return {
      data: [],
    };
  }
}

export async function get_history_orders(page) {
  const token = await cookies().get("token");
  try {
    const response = await fetch(HISTORY_ORDERS(page), {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;
  } catch (e) {
    console.log(e);
    return {
      data: [],
    };
  }
}

export async function patch_update_orders(order_id, update_body) {
  const token = await cookies().get("token");

  try {
    const response = await fetch(UPDATE_ORDERS(order_id), {
      cache: "no-cache",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(update_body),
    });

    const body = await response.json();

    if (body.success !== true) {
      throw new DOMException(get_request_errors(body, locale));
    }

    return body;
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

export async function post_add_order(payload, locale) {
  const token = await cookies().get("token");

  try {
    const response = await fetch(CHECKOUT_ORDERS, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json();

    if (body.success !== true) {
      throw new DOMException(get_request_errors(body, locale));
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

export async function post_return_order(payload ,locale) {
  const token = await cookies().get("token");

  try {
    const response = await fetch(RETURN_ORDERS, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json();

    if (body.success !== true) {
      throw new DOMException(get_request_errors(body, locale));
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}