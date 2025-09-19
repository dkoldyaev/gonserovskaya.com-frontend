import { TImage } from "@/types/image";
import Image from "next/image";
import styles from './text-block-file.module.scss';

export type TSingleImageBlock = {
  __component: "blocks.single-image";
  id: number;
  alt: string;
  title: string;
  image: TImage;
};

export function SingleImageBlock({
  image: {
    formats: {
      thumbnail: {
        url: thumbnailUrl
      }
    },
    alternativeText,
    caption,
    url,
    width,
    height,
  },
  alt = alternativeText,
  title = caption,
}: TSingleImageBlock) {
  return <Image
    className={styles.singleImage}
    alt={alt || title || ''}
    src={url}
    width={width || 1044}
    height={height || 912}
    placeholder="blur"
    blurDataURL={thumbnailUrl || undefined}
  />;
}