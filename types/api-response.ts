import { TDocumentMeta } from "./_document-meta";
import { TImage } from "./image";
import { TBlock } from "./block";

export type TSeo = {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: any;
  metaViewport: string;
  canonicalURL: string;
  og_image: TImage;
  twitter_card: TImage;
  twitter_image: TImage;
};

export type TFile = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  file: TFile;
};

export type TContentImage = {
  id: number;
  image: TImage;
};

export type TContentPage = {
  id: number;
  title: string;
  url: string;
  cover: TImage;
};

export type TContentBlock = TBlock;

export type TPageAttributes = TDocumentMeta & {
  title: string;
  description: string;
  locale: string;
  url: string;
  cover: TImage;
  seo: TSeo;
  content: TContentBlock[];
};

export type TPageData = {
  id: number;
  attributes: TPageAttributes;
};

export type TPageApiResponse = {
  data: TPageData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
