"use client";

export const clear_local_storage = () => {
    localStorage.clear();
};

export const set_local_storage = (key, value) => localStorage.setItem(key, value);
