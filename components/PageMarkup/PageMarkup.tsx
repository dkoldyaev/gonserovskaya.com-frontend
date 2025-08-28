import { JSX, type ReactNode } from 'react';
import styles from './PageMarkup.module.scss';

export function PageMarkup({ children, sideEl }: { children: ReactNode, sideEl?: JSX.Element }): JSX.Element {
  return <div className={styles.layoutWrapper}>
    {sideEl}
    <div className={styles.layout}>{children}</div>
  </div>;
}
