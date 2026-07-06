import { getCurrentLocale } from '@/lib/headers';
import styles from './social-links.module.scss';

type SocialLinksResponse = {
  data: {
    social_links: {
      id: number;
      title: string;
      link: string;
      icon?: {
        url: string;
        alternativeText: string;
      };
    }[];
  }
};

async function getMenuData(locale: string): Promise<SocialLinksResponse['data'] | null> {
  const host = process.env.API_ENDPOINT;
  if (!host) {
    return null;
  }

  const res = await fetch(`${host}/api/menu?populate[social_links][populate][]=icon&locale=${locale}`, {
    cache: 'no-store'
  });

  const data = await res.json();
  return data.data ?? null;
}

export async function SocialLinks() {
  const currentLocale = await getCurrentLocale();
  const menuData = await getMenuData(currentLocale);
  
  if (!menuData) return null;

  const { social_links } = menuData;
  const host = process.env.API_ENDPOINT;

  return (
    <div className={styles.socialLinks}>
      {(social_links || []).map((item) => (
        <a key={item.id} href={item.link} target="_blank" rel="noreferrer" title={item.title} className={styles.socialLink}>
          {item.icon && (
            <img src={item.icon.url.startsWith('http') ? item.icon.url : `${host}${item.icon.url}`} alt={item.title} className={styles.socialLinkImg} />
          )}
        </a>
      ))}
    </div>
  );
}
