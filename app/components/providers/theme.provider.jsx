"use client";
import * as React from "react";
import {useMemo} from "react";
import {ThemeProvider as TP} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "@/components/providers/emotion-cache.provider";
import {build_theme} from "@/theme";

const ltr_theme = build_theme();
const rtl_theme = build_theme("rtl");

export default function ThemeProvider({children, locale}) {

    const theme = useMemo(() => locale === "en" ? ltr_theme : rtl_theme, [locale]);

    return (
        <NextAppDirEmotionCacheProvider options={{key: "mui"}} locale={locale}>
            <TP theme={theme}>
                <CssBaseline/>
                {children}
            </TP>
        </NextAppDirEmotionCacheProvider>
    );
}