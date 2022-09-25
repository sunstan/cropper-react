import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fr from './locales/fr';
import i18n from 'i18next';

export const langs = ['en', 'fr'];

export type LanguagesAvailable = typeof langs[number];

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});

export const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export const getCurrentLanguage = (): LanguagesAvailable => i18n.languages[0] as LanguagesAvailable;

export default i18n;