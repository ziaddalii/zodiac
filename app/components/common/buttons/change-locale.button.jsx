"use client";
import {Button} from "@mui/material";
import {usePathname, useSearchParams} from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import {useTranslation} from "react-i18next";
import {useMemo} from "react";

export default function ChangeLocaleButton({locale}) {

    //LOCALE
    const {t} = useTranslation();

    //ROUTE
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const current_url = useMemo(() =>  {
        const other_locale = locale === "en" ? "ar" : "en";

        const new_path = pathname.replace("/en", "").replace("/ar", "");

        return `/${other_locale}${new_path}?${searchParams}`;
    }, [pathname, searchParams]);

    return (
        <Button
            component={"a"}
            href={current_url}
            aria-label="Change language"
            className="flex items-center gap-2 !min-w-0"
            variant="text">
            <LanguageIcon />
            <p className="lg:block hidden">{t("fields.language")} </p>
        </Button>
    );
}
