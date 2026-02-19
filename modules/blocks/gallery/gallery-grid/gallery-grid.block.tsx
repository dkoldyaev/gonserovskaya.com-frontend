'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { TGalleryBlock } from "../galery.block";
import styles from './gallery-grid.module.scss';
import { GalleryGridLightbox } from './gallery-grid-lightbox';

export function GalleryGridBlock({
  title,
  images,
  slides,
}: TGalleryBlock & { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  return (
    <div className={styles.galleryGrid}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.grid}>
        {images.map(({ image }, index) => (
          <Image
            onClick={() => setCurrentIndex(index)}
            key={image.id}
            alt={image.alternativeText || image.caption || ''}
            src={image.formats.small.url || image.url}
            className={styles['imageGalleryGrid-image']}
            width={240}
            height={200}
            blurDataURL={image.formats.thumbnail.url}
            placeholder={image.formats.thumbnail.url ? 'blur' : undefined}
          />
        ))}
      </div>
      <GalleryGridLightbox index={currentIndex} slides={slides} onClose={() => setCurrentIndex(-1)} />
    </div>
  );
}