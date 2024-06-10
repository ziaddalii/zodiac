import { LOCATIONS } from "../constants";
import { cookies } from "next/headers";

export async function get_locations() {
    const token = await cookies().get("token");
    try {
      const response = await fetch(LOCATIONS, {
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
      return {
        countries: [],
        provinces: [],
        cities: [],
      };
    }
  }