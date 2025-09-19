import 'server-only';
import { Metadata } from 'next';
import { getDictionary } from '@/i18n/get-dictionary';
import { getCurrentUrl } from '@/lib/headers';
import { PageMarkup } from '@/components/page-markup';
import { PageTop } from '@/components/page-top';
import { pageService } from '@/services';
import { metadataGenerator } from '@/modules/seo';
import styles from './page.module.scss';
import { Block } from '@/modules/blocks/block';

const PORTFOLIO_DEFAULT_SLUG: string[] = [];

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
  const currentUrl = await getCurrentUrl();
  console.log({ params: await params, currentUrl });
  const { slug = PORTFOLIO_DEFAULT_SLUG, locale } = await params;
  const dict = await getDictionary(locale);
  const page = await pageService.getPageBySlug(slug, locale);

  return (
    <>
      <PageTop />
      <div className={styles.mainSection}>
        <PageMarkup>
          <main>
            {page?.content.map(block => (
              <Block key={block.id} {...block} />
            ))}
          </main>
        </PageMarkup>
      </div>
    </>
  );
}
