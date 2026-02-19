import Lightbox, { Slide } from "yet-another-react-lightbox";

export function GalleryGridLightbox({ index, slides, onClose }: { index: number, slides: Slide[], onClose: () => void }) {
  return (
    <Lightbox
      index={index}
      slides={slides}
      open={index >= 0}
      close={onClose}
    />
  )
}