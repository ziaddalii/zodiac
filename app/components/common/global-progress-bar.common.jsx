"use client";

import {LinearProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {sleep} from "/util/common";

export async function toggle_loading(status) {
    window.dispatchEvent(
        new CustomEvent(
            "toggle_loading",
            {
                detail: {status},
            },
        ),
    );
    await sleep(1);
}

export function GlobalProgressBar() {

    const [show, set_show] = useState(false);

    const on_toggle_loading = ({detail: {status}}) => {
        set_show(status);
    };

    useEffect(() => {

        window.addEventListener("toggle_loading", on_toggle_loading);

        return () => {
            window.removeEventListener("toggle_loading", on_toggle_loading);
        };
    }, []);

    return (
        <section className="sticky z-[1000] top-0">
            {
                show && <LinearProgress
                    id="global-progress-bar"
                    variant="indeterminate"
                    color="accent"
                    style={{
                        height: "1rem",
                    }}
                ></LinearProgress>
            }
        </section>
    );
}
