import 'server-only';
import { getDictionary } from '@/i18n/get-dictionary';
import { LangSwitcher } from '@/components/lang-switcher/lang-switcher';
import { getCurrentLocale, getCurrentUrl } from '@/lib/headers';
import { PageMarkup } from '@/components/PageMarkup';
import { PageTop } from '@/components/page-top';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function Page({ params: { slug } }: { params: { slug: string, locale: string } }) {
  const locale = await getCurrentLocale();
  const dict = await getDictionary(locale);
  const currentUrl = await getCurrentUrl();

  return (
    <>
      <PageTop />
      <div className={styles.mainSection}>
        <PageMarkup>

          <main>
            <h1>{dict.title}</h1>
            <p>{dict.description}</p>
            <p>Current URL: {currentUrl}</p>
            <p>Locale: {locale}</p>
            <pre>{JSON.stringify(slug)}</pre>
          </main>
        </PageMarkup>
      </div>
    </>
  );
}
