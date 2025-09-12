import 'server-only';

const dictionaries = {
  en: () => import('@/i18n/locales/en.json').then((m) => m.default),
  es: () => import('@/i18n/locales/es.json').then((m) => m.default),
  ru: () => import('@/i18n/locales/ru.json').then((m) => m.default)
} as const satisfies Record<string, () => Promise<Record<string, string>>>;

export class DictionaryService {
  async getDictionary(locale: string): Promise<Record<string, string>> {
    const loader = (dictionaries as Record<string, () => Promise<Record<string, string>>>)[locale];
    if (!loader) return dictionaries.en();
    return loader();
  }
}

export const dictionaryService = new DictionaryService();
