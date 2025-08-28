import { headers } from 'next/headers';

export async function getCurrentLocale(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-current-locale') || 'en';
}

export async function getCurrentUrl(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-current-url') || '/';
}

export async function getCurrentLocaleAndUrl(): Promise<{ locale: string; url: string }> {
  const headersList = await headers();
  return {
    locale: headersList.get('x-current-locale') || 'en',
    url: headersList.get('x-current-url') || '/'
  };
}
