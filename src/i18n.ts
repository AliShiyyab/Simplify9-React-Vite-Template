import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "../public/locales/en/translation.json";
import arabic from "../public/locales/ar/translation.json";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        resources: {
            ar: { translation: arabic },
            en: { translation: english }
        },
        lowerCaseLng: true,
        ns: ["common"],
        defaultNS: "common",
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        }
    });

export default i18n;
