import { LangSwitcher } from '../LangSwitcher/LangSwitcher';
import { PageMarkup } from '../PageMarkup';
import { Menu } from '../Menu/Menu';
import { getCurrentLocale } from '@/lib/headers';
import styles from './header.module.scss';

export async function PageTop() {
  return (
    <div className={styles.header}>
      <PageMarkup sideEl={<LangSwitcher />}>
        <div className={styles.headerInner}>
          <Menu />
        </div>
      </PageMarkup>
    </div>
  );
}
