// Helper functions for working with localized mock data
export type LocalizedString = {
  tr: string;
  en: string;
};

export type LocalizedArray = {
  tr: string[];
  en: string[];
};

export function getLocalizedString(str: LocalizedString, lang: 'tr' | 'en'): string {
  return str[lang];
}

export function getLocalizedArray(arr: LocalizedArray, lang: 'tr' | 'en'): string[] {
  return arr[lang];
}

