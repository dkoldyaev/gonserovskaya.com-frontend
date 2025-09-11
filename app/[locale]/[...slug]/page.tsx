import 'server-only';
import { getDictionary } from '@/i18n/get-dictionary';
import { LangSwitcher } from '@/components/lang-switcher/lang-switcher';
import { getCurrentLocale, getCurrentUrl } from '@/lib/headers';
import { PageMarkup } from '@/components/PageMarkup';
import { PageTop } from '@/components/page-top';
import { TPageApiResponse, TPageData } from '@/types/api-response';
import styles from './page.module.scss';
import qs from 'qs';

const host = process.env.API_ENDPOINT;

async function getAllPages(): Promise<TPageApiResponse> {
  const locale = await getCurrentLocale();
  const query = qs.stringify({
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  }, {
    encodeValuesOnly: true,
  });
  const url = `${host}/api/pages/?${query}`;
  console.log('getAllPages', { url });
  return await (await fetch(url)).json();
}

async function getPage(slug: string[]): Promise<TPageData | undefined> {
  const locale = await getCurrentLocale();
  const query = qs.stringify({
    locale,
    filters: {
      url: {
        "$eq": `/${(slug || ['projects']).join('/')}`
      }
    },
    populate: [
      'cover',
      'seo.og_image',
      'seo.twitter_card',
      'seo.twitter_image',
      'content',
      'content.image',
      'content.file',
      'content.file.file',
      'content.images',
      'content.images.image',
      'content.pages',
      'content.pages.cover'
    ]
  }, { encodeValuesOnly: false });

  const url = `${host}/api/pages?${query}`;
  console.log({ url });

  const response: TPageApiResponse = await (await fetch(url)).json();
  return response.data[0];
}

export default async function Page({ params }: { params: { slug: string[]; locale: string } }) {
  const { slug, locale } = params;
  const dict = await getDictionary(locale);
  const currentUrl = await getCurrentUrl();
  const page = await getPage(slug);

  return (
    <>
      <PageTop />
      <div className={styles.mainSection}>
        <PageMarkup>
          <main>
            <pre>{JSON.stringify(page, null, 2)}</pre>
          </main>
        </PageMarkup>
      </div>
    </>
  );
}
