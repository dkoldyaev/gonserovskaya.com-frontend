import { LangSwitcher } from '../lang-switcher/lang-switcher';
import { PageMarkup } from '../page-markup';
import styles from './page-top.module.scss';
import { Menu } from '../menu/menu';
import { SocialLinks } from '../social-links';

export async function PageTop({ locale, currentUrl }: { locale: string; currentUrl: string }) {
  return (
    <div className={styles.header}>
      <PageMarkup sideEl={<LangSwitcher locale={locale} currentUrl={currentUrl} />}>
        <div className={styles.headerInner}>
          <Menu locale={locale} currentUrl={currentUrl} />
          <SocialLinks locale={locale} />
        </div>
      </PageMarkup>
    </div>
  );
}
