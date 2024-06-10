"use client";

import {useGlobalStore} from "@/store/global";
import {useEffect} from "react";

export default function InitProvider() {

    const {init_profile} = useGlobalStore();

    useEffect(() => {
        init_profile();
    }, []);

    return (<></>);
}
