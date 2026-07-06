import 'server-only';
import { Metadata } from 'next';
import { PageMarkup } from '@/components/page-markup';
import { PageTop } from '@/components/page-top';
import { pageService } from '@/services';
import { metadataGenerator } from '@/modules/seo';
import styles from './page.module.scss';
import { Block } from '@/modules/blocks/block';

const PORTFOLIO_DEFAULT_SLUG: string[] = [];

import { getI18n } from '@/i18n/remote';

export async function generateStaticParams() {
  const { locales } = await getI18n();
  // Fetch default locale pages. We assume slugs are identical across locales.
  const pagesData = await pageService.getAllPages();
  const pages = pagesData?.data || [];
  
  const params: { locale: string; slug: string[] }[] = [];
  
  for (const page of pages) {
    if (!page.url || page.url === '/') continue;
    
    const slug = page.url.split('/').filter(Boolean);
    
    for (const localeObj of locales) {
      params.push({
        locale: localeObj.code,
        slug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[]; locale: string }> }): Promise<Metadata> {
  const { slug = PORTFOLIO_DEFAULT_SLUG, locale } = await params;
  const page = await pageService.getPageBySlug(slug, locale);

  if (!page) {
    return metadataGenerator.generateDefault(locale);
  }

  const metadata = metadataGenerator.generateFromPage(page);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots,
    viewport: metadata.viewport,
    alternates: {
      canonical: metadata.canonicalUrl,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.twitterImage ? [metadata.twitterImage] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[]; locale: string }> }) {
  if (!params) {
    return <div>Loading...</div>;
  }
  const { slug = PORTFOLIO_DEFAULT_SLUG, locale } = await params;
  const page = await pageService.getPageBySlug(slug, locale);

  const isListingPage = page?.content.some(block => block.__component === 'blocks.pages-list');
  const currentUrl = slug.length > 0 ? `/${locale}/${slug.join('/')}` : `/${locale}`;

  return (
    <>
      <PageTop locale={locale} currentUrl={currentUrl} />
      <div className={styles.mainSection}>
        <PageMarkup>
          <main className={styles.pageContent}>
            {!isListingPage && page?.title && (
              <h1 className={styles.pageTitle}>{page.title}</h1>
            )}
            <div className={styles.pageBlocks}>
              {page?.content.map(block => (
                <Block key={block.id} blockData={block} locale={locale} />
              ))}
            </div>
          </main>
        </PageMarkup>
      </div>
    </>
  );
}
