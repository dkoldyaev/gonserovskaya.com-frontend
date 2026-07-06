import { TEmbeddedBlock, TextBlockEmbedded } from "./embedded.block";
import { BlockFile, TFileBlock } from "./file/file.block";
import { GalleryBlock, TGalleryBlock } from "./gallery/galery.block";
import { PagesListBlock, TPagesListBlock } from "./pages-list/pages-list.block";
import { SingleImageBlock, TSingleImageBlock } from "./single-image.block/single-image.block";
import { BlockText, TTextBlock } from "./text.block";

export type TBlock =
  | TFileBlock
  | TEmbeddedBlock
  | TSingleImageBlock
  | TGalleryBlock
  | TPagesListBlock
  | TTextBlock;

export function Block({ blockData, locale }: { blockData: TBlock; locale: string }) {
  switch (blockData.__component) {
    case 'blocks.text':
      return <BlockText {...blockData} />
    case 'blocks.single-image':
      return <SingleImageBlock {...blockData} />
    case 'blocks.embedded':
      return <TextBlockEmbedded {...blockData} />
    case 'blocks.gallery':
      return <GalleryBlock {...blockData} />
    case 'blocks.pages-list':
      return <PagesListBlock {...blockData} locale={locale} />
    case 'blocks.file':
      return <BlockFile {...blockData} />
    default:
      return <pre>{JSON.stringify(blockData, null, 2)}</pre>
  }
}