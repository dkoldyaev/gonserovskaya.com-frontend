import { JSX } from 'react';
import Link from 'next/link';
import styles from './menu.module.scss';
import classNames from 'classnames';

export type TMenuItem = {
  id: number;
  text: string;
  target: "_self" | "_blank";
  page: {
    id: number;
    url: string;
  };
};

type MenuResponse = {
  data: { item: TMenuItem[] }
};

export async function MenuItem({ text, target, page, isCurrent, locale }: TMenuItem & { isCurrent?: boolean, locale: string }) {
  const className = classNames(
    styles.menuLink,
    { [styles['menuLink-active']]: isCurrent }
  );
  const localizedUrl = page.url.startsWith('/')
    ? `/${locale}${page.url}`      // /about → /en/about
    : `/${locale}/${page.url}`;

  return (
    <li>
      <Link href={localizedUrl} className={className} target={target}>
        {text}
      </Link>
    </li>
  );
}

async function getMenuData(locale: string): Promise<TMenuItem[]> {
  const host = process.env.API_ENDPOINT;
  if (!host) {
    return [];
  }

  const res = await fetch(`${host}/api/menu?populate[]=item&populate[]=item.page&locale=${locale}`);

  const data: MenuResponse = await res.json();
  return data.data?.item ?? [];
}

export async function Menu({ locale, currentUrl }: { locale: string; currentUrl: string }): Promise<JSX.Element> {
  const menuItems = await getMenuData(locale);

  return (
    <ul className={styles.menu}>
      {(menuItems || []).map(menuItem => {
        const localizedUrl = menuItem.page.url.startsWith('/')
          ? `/${locale}${menuItem.page.url}`
          : `/${locale}/${menuItem.page.url}`;
        const isExactMatch = currentUrl === localizedUrl || (menuItem.page.url === '/' && currentUrl === `/${locale}`);
        const isSubPage = menuItem.page.url === '/'
          ? currentUrl.startsWith(`/${locale}/`) && !menuItems.some(other => other.page.url !== '/' && currentUrl.startsWith(other.page.url.startsWith('/') ? `/${locale}${other.page.url}` : `/${locale}/${other.page.url}`))
          : currentUrl.startsWith(`${localizedUrl}/`);
        const isCurrent = isExactMatch || isSubPage;
        return (
          <MenuItem
            key={menuItem.id}
            {...menuItem}
            isCurrent={isCurrent}
            locale={locale}
          />
        );
      })}
    </ul>
  );
}
