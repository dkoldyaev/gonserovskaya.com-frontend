import { TDocumentMeta } from "./_document-meta";
import { TBlock } from "./block";
import { TImage } from "./image";
import { TPageData, TPageApiResponse } from "./api-response";

export type TPagePopulatedFields = {
  cover: TImage;
  content: TBlock[];
  url: string;
  seo: {
    og_image: TImage;
    twitter_card: TImage;
    twitter_image: TImage;
  };
};

export type TPage<T extends keyof TPagePopulatedFields> = TDocumentMeta & {
  title: string;
  locale: string;
} & Pick<TPagePopulatedFields, T>;

export type TPageWithSeo = TPage<'cover' | 'content' | 'url' | 'seo'>;

export { TPageData, TPageApiResponse };