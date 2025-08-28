import { JSX, useCallback } from 'react';
import styles from './lang-switcher.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

export function LangSwitcherItem(lang) {
  const current: boolean;
  const className = classNames(styles['lang-item'], { [styles['lang-item--active']]: current });

  return <li key={lang} className={className}>
    <Link
      className={styles['lang-link']}
      href={`/${lang.code}`}
    >{lang.name}</Link>
  </li>;
}

export function LangSwitcher(): JSX.Element {
  const className = classNames(styles.langSwitcher, { [styles['langSwitcher--opened']]: isOpen });

  return <div className={className}>
    <ul>
      {currentLang && <LangSwitcherItem
        lang={currentLang}
        current={true}
        key={currentLang}
        onClick={toggle}
      />}
      {availableLanguages.filter(lang => lang !== currentLang).map(lang => (
        <LangSwitcherItem
          onClick={close}
          lang={lang}
          current={lang === currentLang}
          key={lang}
        />
      ))}
    </ul>
  </div>;
}
