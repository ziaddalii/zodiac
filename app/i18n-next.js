import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "/i18n.config";

export default async function getTranslations(
    locale,
    i18nInstance,
    resources,
) {
    i18nInstance = i18nInstance || createInstance();

    i18nInstance.use(initReactI18next);

    if (!resources) {
        i18nInstance.use(
            resourcesToBackend(
                (language, namespace) =>
                    import(`./locales/${language}/${namespace}.json`)
            )
        );
    }

    await i18nInstance.init({
        lng: locale,
        resources,
        nsSeparator: ".",
        ns: ["fields", "placeholders", "navigation", "validations", "messages"],
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        load: "all",
        preload: resources ? [] : i18nConfig.locales,
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t,
        dir: i18nInstance.dir(locale),
    };
}
