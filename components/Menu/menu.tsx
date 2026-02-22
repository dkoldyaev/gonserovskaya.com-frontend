import { JSX } from 'react';
import Link from 'next/link';
import styles from './menu.module.scss';
import classNames from 'classnames';
import { getCurrentLocale } from '@/lib/headers';

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

export async function MenuItem({ text, target, page, isCurrent }: TMenuItem & { isCurrent?: boolean }) {
  const className = classNames(
    styles.menuLink,
    { [styles['menuLink-active']]: isCurrent }
  );
  const currentLocale = await getCurrentLocale();
  const localizedUrl = page.url.startsWith('/')
    ? `/${currentLocale}${page.url}`      // /about → /en/about
    : `/${currentLocale}/${page.url}`;

  return (
    <li>
      <Link href={localizedUrl} locale={currentLocale} className={className} target={target}>
        {text}
      </Link>
    </li>
  );
}

async function getMenuData(): Promise<TMenuItem[]> {
  const host = process.env.API_ENDPOINT;
  if (!host) {
    return [];
  }

  const res = await fetch(`${host}/api/menu?populate[]=item&populate[]=item.page`, {
    cache: 'no-store'
  });

  const data: MenuResponse = await res.json();
  return data.data?.item;
}

export async function Menu(): Promise<JSX.Element> {
  const menuItems = await getMenuData();

  return (
    <ul className={styles.menu}>
      {(menuItems || []).map(menuItem => (
        <MenuItem
          key={menuItem.id}
          {...menuItem}
        />
      ))}
    </ul>
  );
}
