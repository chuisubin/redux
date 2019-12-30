import i18n from "i18next";

import en from "./en";
import zh from "./zh";

i18n.use("en").init({
  fallbackLng: "en",
  resources: {
    en,
    zh,
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false
    }
  }
});

export default i18n;
