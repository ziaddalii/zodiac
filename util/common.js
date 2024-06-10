import defaultUserImage from "/public/default-user.jpg";
import * as dayjs from "dayjs";

export const format_price = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
};

export const format_prices = (prices) => {
    return format_price(prices.discount > 0 ? prices.discount : prices.normal);
};

export const get_user_photo_url = (imageUrl) => {
    return imageUrl !== "" ? imageUrl : defaultUserImage.src;
};

export const sleep = (seconds) =>
    new Promise((r) => setTimeout(r, seconds * 1000));

export const repeat = (count, callback) => {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push(callback());
    }

    return list;
};

export const scroll_to_top = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const flip_coin = (heads, tails) =>
    Math.random() > 0.5 ? heads : tails;

export const format_page_num = (page) => {
    const parsed_page = parseInt(page);

    if (isNaN(parsed_page)) {
        return 1;
    }

    return parsed_page;
};

export const get_request_errors = (e, locale) => {
    if (e.errors && Array.isArray(e.errors)) {
        return e.errors.join(", ");
    }

    if (e.message) {
        return e.message;
    }

    return locale === "ar" ? "حدث خطأ غير متوقع" : "Unexpected Error Occurred";
};

export const format_date = (date_string, template = "DD/MM/YYYY") => {
    return dayjs(date_string).format(template);
};

export const format_date_day_and_month = (date_string, template = "DD/MMM") => {
    return dayjs(date_string)
        .format(template)
        .replace(/T.*/, "")
        .split("/")
        .join(" ");
};

export const get_order_status_text = (status) => {
    switch (status) {
        case "-1":
            return "fields.cancelled";
        case "0":
            return "fields.pending";
        case "1":
            return "fields.paid";
        case "2":
            return "fields.prepared";
        case "3":
            return "fields.calling-customer";
        case "4":
            return "fields.reviewed";
        case "5":
            return "fields.waiting-shipping";
        case "6":
            return "fields.out-for-shipping";
        case "7":
            return "fields.completed";
        case "8":
            return "fields.delayed";
        case "55":
            return "fields.request-return";
        case "66":
            return "fields.returning";
        case "77":
            return "fields.partial-refund";
        case "88":
            return "fields.full-refund";
        case "9":
            return "fields.reject-fund";
    }
};


const split_query_to_object = (query_str) => {
    const query_list = query_str.includes("?") ?
        (query_str.split("?")[1] ?? "").split("&") :
        query_str.split("&");

    const query = {};

    query_list.forEach((e) => {
        const key_value_split = e.split("=");

        if (key_value_split[0] !== undefined && key_value_split[1] !== undefined) {
            query[key_value_split[0]] = key_value_split[1];
        }
    });

    return query;
};

export const build_base_url_query = (query_obj = {}, base_url = "", exclude = []) => {

    let final_url = base_url;

    Object.keys(query_obj).filter((e) => !exclude.includes(e)).forEach((e) => {

        if (!query_obj[e]) {
            return;
        }

        if (final_url.includes("?")) {
            final_url += `&${e}=${query_obj[e]}`;
        } else {
            final_url += `?${e}=${query_obj[e]}`;
        }
    });

    return final_url;
};

export const get_products_type = (type) => {
    switch (type) {
        case "best-sellers":
            return "fields.best-sellers";
        case "new-arrivals":
            return "fields.new-arrivals";
    }
};

export const random_int_between = (min, max) => {
    return Math.floor(Math.random() * (max - 1 - min + 1) + min);
};

export const go_to = (locale, path) => `/${locale}/${path}`;

export const create_slug = (input_str) => {
    return input_str
        .toLowerCase()
        .replace(/\s+/g, "-") // MATCH SPACE
        .replace(/[^a-z0-9-]/g, "") // MATCH NOT IN SET [NOT LETTERS - NOT NUMBERS]
        .replace(/-{2,}/g, "-") // REMOVE CONSECUTIVE HYPHENS
        .replace(/^-+|-+$/g, ""); // REMOVE LEADING AND TRAILING HYPHENS
};
