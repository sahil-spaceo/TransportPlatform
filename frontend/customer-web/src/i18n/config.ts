import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
const en = require('./locales/en.json');
const es = require('./locales/es.json');
const fr = require('./locales/fr.json');
const de = require('./locales/de.json');
const ar = require('./locales/ar.json');

// Language configuration
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
] as const;

// RTL languages
export const rtlLanguages = ['ar', 'he'];

// i18n configuration
i18n
  .use(initReactI18next)
  .init({
    // Fallback language
    fallbackLng: 'en',
    
    // Supported languages
    supportedLngs: supportedLanguages.map(lang => lang.code),
    
    // Debug mode
    debug: process.env.NODE_ENV === 'development',
    
    // Translation resources
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      ar: { translation: ar },
      // Additional languages will be loaded dynamically
    },
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already does escaping
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'currency') {
          return new Intl.NumberFormat(lng || 'en', {
            style: 'currency',
            currency: getCurrencyForLanguage(lng || 'en'),
          }).format(value);
        }
        if (format === 'date') {
          return new Intl.DateTimeFormat(lng || 'en').format(new Date(value));
        }
        if (format === 'time') {
          return new Intl.DateTimeFormat(lng || 'en', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(value));
        }
        return value;
      },
    },
    
    // React specific options
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
    },
    
    // Keyseparator
    keySeparator: '.',
    nsSeparator: ':',
  });

// Helper function to get currency for language
function getCurrencyForLanguage(lng: string): string {
  const currencyMap: Record<string, string> = {
    en: 'USD',
    es: 'EUR',
    fr: 'EUR',
    de: 'EUR',
    it: 'EUR',
    pt: 'EUR',
    ru: 'RUB',
    ar: 'SAR',
    zh: 'CNY',
    ja: 'JPY',
    ko: 'KRW',
    hi: 'INR',
    nl: 'EUR',
    sv: 'SEK',
    he: 'ILS',
  };
  return currencyMap[lng] || 'USD';
}

// Helper function to check if language is RTL
export const isRTL = (lng: string): boolean => {
  return rtlLanguages.includes(lng as any);
};

export default i18n;