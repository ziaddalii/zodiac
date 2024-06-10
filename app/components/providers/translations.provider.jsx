"use client";

import getTranslations from "@/i18n-next";
import {I18nextProvider} from "react-i18next";
import {createInstance} from "i18next";

export default function TranslationsProvider(
    {
        children,
        locale,
        resources,
    }
) {
    const i18n = createInstance();

    getTranslations(locale, i18n, resources);

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );

}
