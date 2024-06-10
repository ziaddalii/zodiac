// const ROOT_URL = "http://192.168.1.55:8001";
const ROOT_URL = "https://api.zodiac-eg.co";
export const BASE_URL = `${ROOT_URL}/public`;

export const FRONT_URL = "https://zodiac-eg.co";

// STATIC PAGES
export const ABOUT = `${BASE_URL}/static-pages/about`;
export const PRIVACY = `${BASE_URL}/static-pages/privacy`;
export const FAQS = `${BASE_URL}/faq`;
export const TERMS = `${BASE_URL}/static-pages/terms`;
export const SHIPPING = `${BASE_URL}/static-pages/shipping`;
export const BRANCHES = `${BASE_URL}/branches`;
export const CONTACT_US = `${BASE_URL}/contact-us-forms`;

// PROFILE
export const PROFILE = `${BASE_URL}/auth/profile`;
export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;

// LOCATIONS
export const LOCATIONS = `${BASE_URL}/locations/locations/index`;

// WISHLIST
export const WISHLIST = `${BASE_URL}/auth/favorites`;

// CART
export const CART = `${BASE_URL}/auth/cart`;
export const CART_UPDATE = `${BASE_URL}/auth/cart`;
export const CART_PUBLIC = `${BASE_URL}/cart`;

// ORDERS
export const ORDERS = `${BASE_URL}/auth/orders`;
export const CURRENT_ORDERS = (page) => `${BASE_URL}/orders/current?page=${page}`;
export const HISTORY_ORDERS = (page) => `${BASE_URL}/orders/history?page=${page}`;
export const UPDATE_ORDERS = (order_id) => `${BASE_URL}/orders/${order_id}`;

// LAYOUT
export const LAYOUT = `${BASE_URL}/layout`;

// KIDS
export const KIDS = `${BASE_URL}/home/kids`;

// WOMEN
export const WOMEN = `${BASE_URL}/home/women`;

// PRODUCTS TYPE
export const PRODUCTS_TYPE = (products_type, page, sort) => `${BASE_URL}/products/all/${products_type}?page=${page}${sort === "" ? "" : `&sort=${sort}`}`;

// PRODUCT DETAILS
export const PRODUCT_DETAILS = (product_id) => `${BASE_URL}/products/${product_id}`;

// CATEGORIES FILTER
export const CATEGORIES_FILTER = `${BASE_URL}/category/all/list`;
export const GET_CATEGORIES_FILTER = (category_id) => `${BASE_URL}/category/all/filter?category=${category_id}`;
export const GET_SUB_CATEGORIES_FILTER = (sub_category_id) => `${BASE_URL}/category/all/filter?sub_category=${sub_category_id}`;

// CATEGORIES
export const CATEGORIES = `${BASE_URL}/categories`;

// CHECKOUT
export const CHECKOUT = `${BASE_URL}/auth/checkout`;
export const CHECKOUT_ORDERS = `${BASE_URL}/orders`;
export const RETURN_ORDERS = `${BASE_URL}/return-requests`;

export const COUPON = `${BASE_URL}/coupons/validate`;

// COMPARE
export const COMPARE = `${BASE_URL}/list/products/compare`;

// SEARCH
export const SEARCH_PRODUCTS = `${BASE_URL}/search/products`;
