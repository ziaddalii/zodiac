"use client";

import {getCookie, setCookie} from "cookies-next";
import dayjs from "dayjs";

export const set_cookies_after_login = (token, expires_at, user_id) => {
    
    const expires_at_date = dayjs().add(expires_at, "minute").toDate();
    
    setCookie(
        "token",
        token,
        {
            domain: process.env.DOMAIN,
            expires: expires_at_date,
            path: "/",
            secure: process.env.COOKIE_SECURE === "true",
        },
    );
    
    setCookie(
        "user_id",
        user_id,
        {
            domain: process.env.DOMAIN,
            expires: expires_at_date,
            path: "/",
            secure: process.env.COOKIE_SECURE === "true",
        },
    );
    
};

export const is_authenticated = () => {
    return getCookie("token");
};
