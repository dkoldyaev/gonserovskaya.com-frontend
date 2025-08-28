import { NextResponse, type NextRequest } from 'next/server';
import { getI18n } from './i18n/remote';

const LOCALE_COOKIE = 'NEXT_LOCALE';

const parseAcceptLanguage = (header: string | null) => {
  if (!header) return [] as string[];
  return header
    .split(',')
    .map((part) => part.trim().split(';')[0])
    .filter(Boolean);
};

const resolvePreferredLocale = (req: NextRequest, locales: readonly string[], defaultLocale: string): string => {
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  const accepted = parseAcceptLanguage(req.headers.get('accept-language'));
  const found = accepted
    .map((tag) => tag.toLowerCase().split('-')[0])
    .find((code) => locales.includes(code));
  return found ?? defaultLocale;
};

export async function middleware(req: NextRequest) {
  const { locales, defaultLocale } = await getI18n();
  const { pathname } = req.nextUrl;
  const hasLocalePrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocalePrefix) {
    const locale = pathname.split('/')[1] || defaultLocale;
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Redirect to default locale provided by API, regardless of Accept-Language
  const locale = defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|assets|images|api).*)']
};


