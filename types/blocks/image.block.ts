import { TImage } from "../image";

export type TImageBlock = {
  __component: "blocks.image";
  id: number;
  image: TImage;
  caption?: string;
  alt?: string;
};
