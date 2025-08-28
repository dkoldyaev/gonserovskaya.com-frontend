type RemoteLocale = { code: string; isDefault?: boolean };

const DEFAULT_LOCALES: readonly string[] = ['en', 'es'];
const DEFAULT_DEFAULT = 'en';

export async function getI18n(): Promise<{ locales: readonly string[]; defaultLocale: string }> {
  const host = process.env.API_ENDPOINT;
  if (!host) {
    return { locales: DEFAULT_LOCALES, defaultLocale: DEFAULT_DEFAULT };
  }
  const res = await fetch(`${host}/api/i18n/locales`, { cache: 'no-store' });
  if (!res.ok) {
    return { locales: DEFAULT_LOCALES, defaultLocale: DEFAULT_DEFAULT };
  }
  const data = (await res.json()) as Array<RemoteLocale>;
  const locales = data.map((l) => l.code);
  const defaultLocale = data.find((l) => l.isDefault)?.code ?? locales[0] ?? DEFAULT_DEFAULT;
  return { locales, defaultLocale };
}


