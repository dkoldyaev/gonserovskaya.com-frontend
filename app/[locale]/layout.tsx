import 'server-only';
import type { ReactNode } from 'react';
import { getI18n } from '@/i18n/remote';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { locales } = await getI18n();
  if (!locales.includes(locale)) {
    // TODO: consider redirect to default locale on invalid param
    throw new Error('Invalid locale');
  }
  return children;
}


