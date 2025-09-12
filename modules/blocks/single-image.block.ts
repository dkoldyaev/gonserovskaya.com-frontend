import { TImage } from "@/types/image";

export type TSingleImageBlock = {
  __component: "blocks.single-image";
  id: number;
  alt: string;
  title: string;
  image: TImage;
};
