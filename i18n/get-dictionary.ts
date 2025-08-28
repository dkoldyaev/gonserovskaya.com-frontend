import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  en: () => import('./locales/en.json').then((m) => m.default),
  es: () => import('./locales/es.json').then((m) => m.default),
  ru: () => import('./locales/ru.json').then((m) => m.default)
} as const satisfies Record<string, () => Promise<Record<string, string>>>;

export async function getDictionary(locale: string) {
  const loader = (dictionaries as Record<string, () => Promise<Record<string, string>>>)[locale];
  if (!loader) return dictionaries.en();
  return loader();
}


