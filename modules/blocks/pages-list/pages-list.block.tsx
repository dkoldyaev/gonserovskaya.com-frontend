import { TPage } from "@/types/page";
import styles from './pages-list.module.scss';
import Link from "next/link";
import Image from 'next/image';
import { getCurrentLocale } from '@/lib/headers';

export type TPagesListBlock = {
  __component: "blocks.pages-list",
  id: number,
  pages: TPage<'url' | 'cover' | 'cover_background'>[],
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || result.length < 4) return null
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

function getLocalizedUrl(url: string, locale: string): string {
  return url.startsWith('/') ? `/${locale}${url}` : `/${locale}/${url}`;
}

export async function PagesListBlock({ pages }: TPagesListBlock) {
  const currentLocale = await getCurrentLocale();

  return <div className={styles.portfolioList}>
    {pages.map((item, index) => {
      const localizedUrl = getLocalizedUrl(item.url, currentLocale);
      const backgroundColor = item.cover_background || '#363636';
      const backgroundColorSet = hexToRgb(backgroundColor);
      const style = {
        background: `linear-gradient(to bottom, rgba(${backgroundColorSet}, 0.8) 0%, rgba(${backgroundColorSet}, 0) 100%)`
      };
      return <div className={styles.portfolioListItem} key={item.documentId}>
        <h2 className={styles['portfolioListItem-title']}>
          <Link className={styles['portfolioListItem-title-link']}
            style={style}
            href={localizedUrl}
            locale={currentLocale}>
            {item.title}
            {item.cover_background}
          </Link>
        </h2>
        <Link href={localizedUrl} locale={currentLocale}>
          <Image
            className={styles['portfolioListItem-image']}
            src={item.cover.formats.small.url}
            alt={item.title}
            width={item.cover.width || 320}
            height={item.cover.height || 270}
            blurDataURL={item.cover.formats.thumbnail.url}
            placeholder={item.cover.formats.thumbnail.url ? 'blur' : undefined}
            priority={index < 6}
          />
        </Link>
      </div>
    })}
  </div>;
}