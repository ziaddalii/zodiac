"use server";

import {KIDS} from "../constants";

export async function get_kids_page() {
  try {
    const response = await fetch(KIDS, { cache: "no-cache" });

    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;

  } catch (e) {
    console.log(e);
    return {
        carousel:[],
        scatter:[],
        best_sellers:[],
        new_arrivals:[],
        categories:[],
        banners:[],
        blog_articles:[],
    };
  }
}
