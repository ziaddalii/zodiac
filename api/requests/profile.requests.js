"use server";
import {cookies} from "next/headers";
import {PROFILE} from "../constants";
import {get_request_errors} from "../../util/common";

export async function get_profile() {
  const token = await cookies().get("token");
  try {
    const response = await fetch(PROFILE, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
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
      id: 0,
      type: "",
      photoUrl: "",
      name: {
        first: "",
        last: "",
      },
      email: "",
      phones: [],
      addresses: [],
      favorites: [],
      cart: {
        total: 0,
        details: [],
      },
    };
  }
}

export async function post_profile_edit(profile_form, locale) {
  const token = await cookies().get("token");

  try {
    const response = await fetch(PROFILE, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: profile_form,
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

export async function post_addresses(address_form, locale) {
  const token = await cookies().get("token");

  try {
    const response = await fetch(PROFILE, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(address_form),
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
