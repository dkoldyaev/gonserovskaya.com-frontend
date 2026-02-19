import { useMemo } from "react";
import { TImage } from "../../../types/image"
import { Slide } from "yet-another-react-lightbox";
import { GalleryGridBlock } from './gallery-grid/gallery-grid.block';
import { GallerySliderBlock } from "./gallery-slider/gallery-slider.block";

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
  type: 'slider' | 'grid',
  images: TGalleryImage[]
};

export function GalleryBlock(galleryBlock: TGalleryBlock) {

  const slides = useMemo<Slide[]>(() => galleryBlock.images.map(({ image }) => ({
    src: image.url,
    width: image.width,
    height: image.height,
    srcSet: [image, ...Object.values(image.formats)].map((breakpoint) => ({
      src: breakpoint.url,
      width: breakpoint.width,
      height: breakpoint.height,
    })),
  })), []);

  if (galleryBlock.images.length === 0) {
    return null;
  }

  if (galleryBlock.type === 'grid') {
    return <GalleryGridBlock {...galleryBlock} slides={slides} />;
  }

  if (galleryBlock.type === 'slider') {
    return <GallerySliderBlock {...galleryBlock} slides={slides} />;
  }
}