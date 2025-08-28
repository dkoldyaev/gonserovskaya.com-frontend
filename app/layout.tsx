import 'server-only';
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { i18n } from '@/i18n/config';
import { getI18n } from '@/i18n/remote';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const { locales, defaultLocale } = await getI18n();
  const isSupported = locales.includes(cookieLocale ?? '');
  const locale = isSupported ? (cookieLocale as string) : defaultLocale;
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}


