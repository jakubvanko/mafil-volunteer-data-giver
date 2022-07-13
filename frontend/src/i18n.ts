import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const translationEn = {
  login: {
    headingText: "Access your data",
    description:
      "To access your data, please enter your social security number.",
  },
};

const translationCz = {
  login: {
    headingText: "Přístup k vašim datům",
    description: "Pro přístup k vašim datům zadejte prosím své rodné číslo.",
  },
};

const translationSk = {
  login: {
    headingText: "Prístup k vašim dátam",
    description: "Pre prístup k vašim dátam prosím zadajte svoje rodné číslo.",
  },
};

export const applyLocalization = () =>
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: translationEn,
        },
        sk: {
          translation: translationSk,
        },
        cz: {
          translation: translationCz,
        },
      },
    });
