import 'server-only';
import { getDictionary } from '@/i18n/get-dictionary';
import { LangSwitcher } from '@/components/LangSwitcher/LangSwitcher';
import { getCurrentLocale, getCurrentUrl } from '@/lib/headers';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const currentUrl = await getCurrentUrl();

  return (
    <main>
      <h1>{dict.title}</h1>
      <p>{dict.description}</p>
      <p>Current URL: {currentUrl}</p>
      <p>Locale: {locale}</p>
      {slug && slug.length > 0 ? (
        <p>Path segments: {slug.join(' / ')}</p>
      ) : (
        <p>Root locale page</p>
      )}
      <LangSwitcher />
    </main>
  );
}
