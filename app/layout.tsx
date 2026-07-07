import 'server-only';
import type { PropsWithChildren } from 'react';
import styles from './layout.module.scss';
import classNames from 'classnames';
import './globals.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gonserovskaya.com'),
};

export const revalidate = 31536000; // 1 year
export const dynamic = 'force-static';
export default async function RootLayout({ children }: PropsWithChildren) {
  const appClassName = classNames(styles.App);
  return (
    <html>
      <body>
        <div className={appClassName}>
          {children}
        </div>
        <GoogleAnalytics gaId="G-KK5DVSGYHK" />
      </body>
    </html>
  );
}


