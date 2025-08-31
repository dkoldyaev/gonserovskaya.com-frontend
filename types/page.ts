import { TDocumentMeta } from "./_document-meta";
import { TBlock } from "./block";
import { TImage } from "./image"

export type TPagePopulatedFields = {
  cover: TImage,
  content: TBlock[],
  url: string
}

export type TPage<T extends keyof TPagePopulatedFields> = TDocumentMeta & {
  title: string,
  locale: string,
} & Pick<TPagePopulatedFields, T>;