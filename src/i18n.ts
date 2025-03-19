
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import taTranslation from './locales/ta.json';
import teTranslation from './locales/te.json';
import bnTranslation from './locales/bn.json';
import odTranslation from './locales/od.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      hi: {
        translation: hiTranslation
      },
      ta: {
        translation: taTranslation
      },
      te: {
        translation: teTranslation
      },
      bn: {
        translation: bnTranslation
      },
      od: {
        translation: odTranslation
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
