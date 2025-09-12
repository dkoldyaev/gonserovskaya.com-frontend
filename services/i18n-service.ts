import 'server-only';
import { apiClient } from './api-client';

export type Locale = {
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
};

const DEFAULT_LOCALE = 'en';

export class I18nService {
  async getLocales(): Promise<{ locales: readonly Locale[]; defaultLocale: string }> {
    const locales = await apiClient.get<Locale[]>('/api/i18n/locales');
    const defaultLocale = locales.find(({ isDefault }) => isDefault)?.code ?? locales[0]?.code ?? DEFAULT_LOCALE;

    return { locales, defaultLocale };
  }
}

export const i18nService = new I18nService();
