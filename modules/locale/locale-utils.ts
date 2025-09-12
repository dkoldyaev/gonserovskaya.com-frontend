import 'server-only';
import { headers } from 'next/headers';

export class LocaleUtils {
  async getCurrentLocale(): Promise<string> {
    const headersList = await headers();
    return headersList.get('x-current-locale') || 'en';
  }

  async getCurrentUrl(): Promise<string> {
    const headersList = await headers();
    return headersList.get('x-current-url') || '/';
  }

  async getCurrentLocaleAndUrl(): Promise<{ locale: string; url: string }> {
    const headersList = await headers();
    return {
      locale: headersList.get('x-current-locale') || 'en',
      url: headersList.get('x-current-url') || '/'
    };
  }
}

export const localeUtils = new LocaleUtils();
