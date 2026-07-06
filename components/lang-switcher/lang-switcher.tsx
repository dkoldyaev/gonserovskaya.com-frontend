import styles from './lang-switcher.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { getI18n, Locale } from '@/i18n/remote';

export async function LangSwitcherItem({ lang, isCurrent, currentLocale, currentUrl }: { lang: Locale; isCurrent: boolean, currentLocale: string, currentUrl: string }) {
  const className = classNames(styles['lang-item'], { [styles['lang-item--active']]: isCurrent });

  return (
    <li className={className}>
      <Link
        className={styles['lang-link']}
        href={currentUrl.replace(`/${currentLocale}`, `/${lang.code}`)}
      >
        {lang.name}
      </Link>
    </li>
  );
}

export async function LangSwitcher({ locale, currentUrl }: { locale: string, currentUrl: string }) {
  const { locales } = await getI18n();
  const currentLang = locales.find(({ code }) => code === locale);

  return (
    <div className={styles.langSwitcher}>
      <label htmlFor="lang-switcher" className={styles.currentLang}>{(currentLang || locales[0])?.name}</label>
      <input type="checkbox" id="lang-switcher" className={styles.checkboxHandler} />
      <ul className={styles.languagesList}>
        {locales.map(l => (
          <LangSwitcherItem
            key={l.code}
            lang={l}
            isCurrent={l.code === locale}
            currentLocale={locale}
            currentUrl={currentUrl}
          />
        ))}
      </ul>
    </div>
  );
}
