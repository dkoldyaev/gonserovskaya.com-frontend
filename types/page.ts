import { TDocumentMeta } from "./_document-meta";
import { TBlock } from "../modules/blocks/block";
import { TImage } from "./image";
import { TPageData, TPageApiResponse } from "./api-response";

export type TPagePopulatedFields = {
  cover: TImage;
  cover_background: string;
  content: TBlock[];
  url: string;
  seo: {
    og_image: TImage;
    twitter_card: TImage;
    twitter_image: TImage;
  };
};

export type TPage<T extends keyof TPagePopulatedFields> = TDocumentMeta & {
  id: number;
  documentId: string;
  title: string;
  locale: string;
} & Pick<TPagePopulatedFields, T>;

export type TPageWithSeo = TPage<'cover' | 'content' | 'url' | 'seo'>;

export type { TPageData, TPageApiResponse };