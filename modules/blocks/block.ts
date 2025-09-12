import { TGalleryBlock, TPagesListBlock, TTextBlock } from ".";
import { TEmbeddedBlock } from "./embedded.block";
import { TFileBlock } from "./file.block";
import { TImageBlock } from "./image.block";
import { TSingleImageBlock } from "./single-image.block";

export type TBlock =
  | TImageBlock
  | TFileBlock
  | TEmbeddedBlock
  | TSingleImageBlock
  | TGalleryBlock
  | TPagesListBlock
  | TTextBlock;