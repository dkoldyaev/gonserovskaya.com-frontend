import { LangSwitcher } from '../lang-switcher/lang-switcher';
import { PageMarkup } from '../page-markup';
import styles from './page-top.module.scss';
import { Menu } from '../menu/menu';
import { SocialLinks } from '../social-links';

export async function PageTop() {
  return (
    <div className={styles.header}>
      <PageMarkup sideEl={<LangSwitcher />}>
        <div className={styles.headerInner}>
          <Menu />
          <SocialLinks />
        </div>
      </PageMarkup>
    </div>
  );
}
