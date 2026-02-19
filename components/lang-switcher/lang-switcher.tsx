import styles from './lang-switcher.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { getI18n, Locale } from '@/i18n/remote';
import { getCurrentLocale, getCurrentUrl } from '@/lib/headers';

export async function LangSwitcherItem({ lang, isCurrent }: { lang: Locale; isCurrent: boolean }) {
  const className = classNames(styles['lang-item'], { [styles['lang-item--active']]: isCurrent });
  const currentPath = await getCurrentUrl();
  const currentLocale = await getCurrentLocale();

  return (
    <li className={className}>
      <Link
        className={styles['lang-link']}
        locale={lang.code}
        href={currentPath.replace(`/${currentLocale}`, `/${lang.code}`)}
      >
        {lang.name}
      </Link>
    </li>
  );
}

export async function LangSwitcher() {
  const { locales } = await getI18n();
  const currentLocale = await getCurrentLocale();
  const currentLang = locales.find(({ code }) => code === currentLocale);

  return (
    <div className={styles.langSwitcher}>
      <label htmlFor="lang-switcher" className={styles.currentLang}>{(currentLang || locales[0])?.name}</label>
      <input type="checkbox" id="lang-switcher" className={styles.checkboxHandler} />
      <ul className={styles.languagesList}>
        {locales.map(locale => (
          <LangSwitcherItem
            key={locale.code}
            lang={locale}
            isCurrent={locale.code === currentLocale}
          />
        ))}
      </ul>
    </div>
  );
}
