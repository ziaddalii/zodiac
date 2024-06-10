"use server";

import {LAYOUT} from "../constants";

export async function get_layout() {
  try {
    const response = await fetch(LAYOUT, { cache: "no-cache" });

    const body = await response.json();

    if (!body.success) {
      throw new DOMException();
    }

    return body.data;

  } catch (e) {
    console.log(e);

    return {
      custom_scripts:{
        header:[],
        footer:[],
        body:[],
      },
      footer: {
        branches: [],
      },
      navbar: {
        super_categories: [],
      },
    };
  }
}
