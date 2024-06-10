"use server";

import { WOMEN } from "../constants";

export async function get_women_page() {
  try {
    const response = await fetch(WOMEN, { cache: "no-cache" });

    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }
    return body.data;
  } catch (e) {
    console.log(e);
    return {
        carousel:{
            main:[],
            sub:[],
        },
        scatter:[],
        best_sellers:[],
        new_arrivals:[],
        categories:[],
        banners:[],
        blog_articles:[],
    };
  }
}
