export type Locale = {
  id: number,
  name: string,
  code: string,
  isDefault: boolean
};

const DEFAULT_DEFAULT = 'en';

export async function getI18n(): Promise<{ locales: readonly Locale[]; defaultLocale: string }> {
  const host = process.env.API_ENDPOINT;
  const res = await fetch(`${host}/api/i18n/locales`);
  const locales = (await res.json()) as Array<Locale>;
  const defaultLocale = locales.find(({ isDefault }) => isDefault)?.code ?? locales[0].code ?? DEFAULT_DEFAULT;
  return { locales, defaultLocale };
}


