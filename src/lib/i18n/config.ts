import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en';
import pl from './locales/pl';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? 'en';

i18n.use(initReactI18next).init({
  // compatibilityJSON: 'v3',
  resources,
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
