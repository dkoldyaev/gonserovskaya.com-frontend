import { TDocumentMeta } from "./_document-meta";

type TFile = {
  name: string,
  hash: string,
  ext: string,
  mime: "image/jpeg",
  size: number,
  url: string,
}

type TResolution = {
  width: number,
  height: number,
}

type TImageFile = TFile & TResolution;

export type TImageFormat = TImageFile & {
  path: null | string,
  sizeInBytes: number,
};

export type TFormat = 'small' | 'thumbnail' | 'medium'

export type TImage = TImageFile & TDocumentMeta & {
  alternativeText: string,
  caption: string,

  previewUrl: null,
  provider: "aws-s3",
  provider_metadata: null,

  formats: Record<TFormat, TImageFile>,
}