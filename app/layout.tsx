import 'server-only';
import type { PropsWithChildren, ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getI18n } from '@/i18n/remote';
import { PageMarkup } from '@/components/PageMarkup';
import { PageTop } from '@/components/PageTop';
import styles from './layout.module.scss';
import classNames from 'classnames';

export default async function RootLayout({ children }: PropsWithChildren) {
  const appClassName = classNames(styles.App);
  return <html><body>
    <div className={appClassName}>
      <PageTop />
      <div className={styles.mainSection}>
        <PageMarkup>{children}</PageMarkup>
      </div>
    </div>
  </body></html>;
}


