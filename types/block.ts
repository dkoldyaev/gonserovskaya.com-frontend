import {
  TImageBlock,
  TFileBlock,
  TEmbeddedBlock,
  TSingleImageBlock,
  TGalleryBlock,
  TPagesListBlock,
  TTextBlock,
} from "./blocks";

export type TBlock =
  | TImageBlock
  | TFileBlock
  | TEmbeddedBlock
  | TSingleImageBlock
  | TGalleryBlock
  | TPagesListBlock
  | TTextBlock;