import 'server-only';
import { TPageData } from '@/types/api-response';

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  twitterImage?: string;
  robots?: string;
  viewport?: string;
}

export class MetadataGenerator {
  generateFromPage(page: TPageData): MetadataConfig {
    const { seo } = page;

    return {
      title: seo?.title || page.title,
      description: seo?.description || '',
      keywords: seo?.keywords,
      canonicalUrl: page.url,
      ogImage: seo?.og_image?.url,
      twitterImage: seo?.twitter_image?.url,
      robots: undefined,
      viewport: undefined,
    };
  }

  generateDefault(locale: string): MetadataConfig {
    return {
      title: 'Gonserovskaya',
      description: 'Gonserovskaya - Architecture and Design',
      canonicalUrl: `/${locale}`,
    };
  }
}

export const metadataGenerator = new MetadataGenerator();
