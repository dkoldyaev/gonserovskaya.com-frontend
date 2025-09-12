import { TDocumentMeta } from "./_document-meta";
import { TImage } from "./image";
import { TBlock } from "../modules/blocks/block";

export type TSeo = {
  id: number;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_type: string;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: TImage | null;
  twitter_card: TImage | null;
  og_image: TImage | null;
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

export type TPageData = TDocumentMeta & {
  id: number;
  documentId: string;
  title: string;
  locale: string;
  url: string;
  cover: TImage | null;
  seo: TSeo | null;
  content: TContentBlock[];
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
