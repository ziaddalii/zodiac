"use server";
import {CATEGORIES_FILTER, GET_CATEGORIES_FILTER, GET_SUB_CATEGORIES_FILTER, CATEGORIES} from "../constants";
import {get_request_errors} from "../../util/common";

export async function get_categories() {
  try {
      const response = await fetch(CATEGORIES, {
          cache: "no-cache",
      });

      const body = await response.json();

      if (!body.success) {
          throw new DOMException();
      }

      return body.data;

  } catch (e) {
      console.log(e);
      return [];
  }
}

export async function get_categories_filter(category_id) {
    try {
        const response = await fetch(GET_CATEGORIES_FILTER(category_id), {
            cache: "no-cache",
        });

        const body = await response.json();

        if (!body.success) {
            throw new DOMException();
        }

        return body.data;

    } catch (e) {

        console.log(e);

        return {
            category: {},
            sub_category: {},
            categories: [],
            sub_categories: [],
            sizes: [],
            brands: [],
            types: [],
            colors: [],
        };
    }
}

export async function get_sub_categories_filter(sub_category_id) {
  try {
    const response = await fetch(GET_SUB_CATEGORIES_FILTER(sub_category_id), {
      cache: "no-cache",
    });

    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;

  } catch (e) {

    console.log(e);

    return {
      category: {},
      sub_category: {},
      categories: [],
      sub_categories: [],
      sizes: [],
      brands: [],
      types: [],
      colors: [],
    };
  }
}

export async function post_categories_filter(category_filter) {
  try {
    const response = await fetch(CATEGORIES_FILTER, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(category_filter),
    });
    const body = await response.json();
    if (!body.success) {
      throw new DOMException(get_request_errors(body));
    } else {
      return body.data;
    }
  } catch (e) {
    return {
      data: [],
    };
  }
}
