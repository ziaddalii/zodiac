"use client";
import {useEffect} from "react";

export default function ScrollHashIntoView({base = ""}) {

    useEffect(() => {
        const scrollToHashElement = () => {
            const {hash} = window.location;

            const elementToScroll = document.getElementById(base + hash?.replace("#", ""));

            if (!elementToScroll) return;

            window.scrollTo({
                top: elementToScroll.offsetTop,
                behavior: "smooth",
            });
        };

        scrollToHashElement();
        window.addEventListener("hashchange", scrollToHashElement);
        return window.removeEventListener("hashchange", scrollToHashElement);
    }, [base]);

    return (
        <></>
    );
}