import { PageMarkup } from '../PageMarkup';
import styles from './header.module.scss';

export function PageTop() {
  return <div className={styles.header}>
    <PageMarkup sideEl={<LangSwitcher />}>
      <div className={styles.headerInner}>
        <Menu />
        <SocialLinks />
      </div>
    </PageMarkup>
  </div>;
}
