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

  // Check if pathname already has a locale prefix
  const hasLocalePrefix = locales.some((l) => pathname === `/${l.code}` || pathname.startsWith(`/${l.code}/`));

  console.log({ locales, defaultLocale, pathname, hasLocalePrefix });

  if (hasLocalePrefix) {
    const locale = pathname.split('/')[1] || defaultLocale;
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });

    // Add headers for server components
    res.headers.set('x-current-locale', locale);
    res.headers.set('x-current-url', pathname);

    return res;
  }

  // Only redirect if we're at the root path, not if we're already in a locale path
  if (pathname === '/') {
    const locale = defaultLocale;
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });

    // Add headers for server components
    res.headers.set('x-current-locale', locale);
    res.headers.set('x-current-url', `/${locale}`);

    return res;
  }

  // For any other path without locale, let it pass through
  const res = NextResponse.next();

  // Add headers for server components
  res.headers.set('x-current-locale', defaultLocale);
  res.headers.set('x-current-url', pathname);

  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|assets|images|api).*)']
};


