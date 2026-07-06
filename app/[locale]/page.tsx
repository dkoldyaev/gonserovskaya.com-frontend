import 'server-only';
import { generateMetadata as generateMetadataFn } from './[...slug]/page';
import Page from './[...slug]/page';

export default Page;

import { getI18n } from '@/i18n/remote';

export async function generateStaticParams() {
  const { locales } = await getI18n();
  return locales.map(l => ({ locale: l.code }));
}

export const generateMetadata = generateMetadataFn;
