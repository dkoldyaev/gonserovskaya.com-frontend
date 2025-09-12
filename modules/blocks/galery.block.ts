import { TImage } from "../../types/image"

export type TGalleryImage = {
  id: number,
  alt: string,
  title: string,
  image: TImage,
}

export type TGalleryBlock = {
  __component: "blocks.gallery",
  id: number,
  title: string,
  type: string,
  images: TGalleryImage[]
};