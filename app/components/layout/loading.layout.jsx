"use client";

import {Fade} from "@mui/material";
import DefaultImg from "/public/default.webp";
import Image from "next/image";

export function LoadingLayout(
    {
        loading = true,
        isEmpty = true,
        empty = null,
        children,
    }) {
    return (
        <>

            {/*LOADING*/}
            {loading && (
                <Fade in={loading}>
                    <div className="flex justify-center items-center">
                        <Image
                            className="animate-pulse aspect-square rounded-full"
                            src={DefaultImg}
                            alt="zodiac-logo"
                        />
                    </div>
                </Fade>
            )}

            {/*EMPTY SECTION*/}
            {!loading && isEmpty && (
                <Fade in={!loading && isEmpty}>
                    <div>
                        {empty}
                    </div>
                </Fade>
            )}

            {/*CONTENT*/}
            {!loading && !isEmpty && (
                <Fade in={!loading && !isEmpty}>
                    <div>
                        {children}
                    </div>
                </Fade>
            )}

        </>
    );
}
