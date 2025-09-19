import { TGalleryBlock, TPagesListBlock, TTextBlock } from ".";
import { TEmbeddedBlock, TextBlockEmbedded } from "./embedded.block";
import { TFileBlock } from "./file.block";
import { SingleImageBlock, TSingleImageBlock } from "./single-image.block/single-image.block";
import { BlockText } from "./text.block";

export type TBlock =
  | TFileBlock
  | TEmbeddedBlock
  | TSingleImageBlock
  | TGalleryBlock
  | TPagesListBlock
  | TTextBlock;

export function Block(blockData: TBlock) {
  switch (blockData.__component) {
    case 'blocks.text':
      return <BlockText {...blockData} />
    case 'blocks.single-image':
      return <SingleImageBlock {...blockData} />
    case 'blocks.embedded':
      return <TextBlockEmbedded {...blockData} />
    default:
      return <pre>{JSON.stringify(blockData, null, 2)}</pre>
  }
}