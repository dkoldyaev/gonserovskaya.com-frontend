'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Inline from "yet-another-react-lightbox/plugins/inline";
import Lightbox, { Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { TGalleryBlock } from "../galery.block";
import styles from './gallery-slider.module.scss';

export function GallerySliderBlock({
  title,
  slides,
  images
}: TGalleryBlock & { slides: Slide[] }) {

  const [index, setIndex] = useState(0);

  return (
    <div className={styles.gallerySlider}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline]}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: 'cover',
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "880px",
            height: "auto",
            maxHeight: "70vh",
            aspectRatio: `${images[0].image.width} / ${images[0].image.height}`,
            margin: "0 auto",
          },
        }}
      />
      {/* <pre>{JSON.stringify(slides, null, 2)}</pre> */}
    </div>
  );
}