// Simple i18n configuration for Next.js build compatibility
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files dynamically to ensure they're loaded
let enTranslations, esTranslations, frTranslations, deTranslations, arTranslations;

try {
  enTranslations = require('./locales/en.json');
  esTranslations = require('./locales/es.json');
  frTranslations = require('./locales/fr.json');
  deTranslations = require('./locales/de.json');
  arTranslations = require('./locales/ar.json');
} catch (error) {
  console.error('Error loading translation files:', error);
  // Fallback to empty objects
  enTranslations = {};
  esTranslations = {};
  frTranslations = {};
  deTranslations = {};
  arTranslations = {};
}

// Import translation files
const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  de: {
    translation: deTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

// Language configuration
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
] as const;

// RTL languages
export const rtlLanguages = ['ar', 'he'];

// Initialize i18n
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Set default language
    fallbackLng: 'en',
    supportedLngs: supportedLanguages.map(lang => lang.code),
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false,
    },
    
    // Add more configuration for reliability
    load: 'languageOnly', // Don't load country-specific versions
    cleanCode: true, // Clean language codes
    nonExplicitSupportedLngs: false, // Only support explicitly defined languages
  });
}

// Helper function to check if language is RTL
export const isRTL = (lng: string): boolean => {
  return rtlLanguages.includes(lng as any);
};

export default i18n;