import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import ca from "./ca.json"
import es from "./es.json"
import en from "./en.json"
import { route } from "@/lib/routes"

i18n.use(initReactI18next).init({
  resources: {
    ca: { translation: ca },
    es: { translation: es },
    en: { translation: en },
  },
  // L'idioma el marca la URL (/, /es/, /en/)
  lng: route.lang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
