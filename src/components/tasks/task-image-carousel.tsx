"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ContentImage } from "@/components/shared/content-image";
import { ImageModal } from "@/components/shared/image-modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: images.length > 1,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const canScrollPrev = emblaApi.canScrollPrev();
      const canScrollNext = emblaApi.canScrollNext();
      setCanPrev(canScrollPrev);
      setCanNext(canScrollNext);
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goToPrev = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!images.length) return null;

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="min-w-0 flex-[0_0_100%] cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-[16/10] w-full">
                  <ContentImage
                    src={src}
                    alt={`Gallery image ${index + 1} for verified business listing`}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    quality={78}
                    className="object-cover"
                    intrinsicWidth={1440}
                    intrinsicHeight={900}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={images.length <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollNext()}
            disabled={images.length <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      </div>
      <ImageModal
        images={images}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}




