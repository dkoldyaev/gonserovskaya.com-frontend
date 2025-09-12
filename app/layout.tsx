import 'server-only';
import type { PropsWithChildren } from 'react';
import { getI18n } from '@/i18n/remote';
import styles from './layout.module.scss';
import classNames from 'classnames';

export default async function RootLayout({ children }: PropsWithChildren) {
  const appClassName = classNames(styles.App);
  return (
    <html>
      <body>
        <div className={appClassName}>
          {children}
        </div>
      </body>
    </html>
  );
}


