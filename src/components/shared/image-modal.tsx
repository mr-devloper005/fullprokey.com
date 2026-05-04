"use client";

import { useEffect, useCallback } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  title,
}: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-5 w-5 text-white" />
      </Button>

      {/* Image counter */}
      <div className="absolute left-4 top-4 z-50 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 z-50 h-12 w-12 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 z-50 h-12 w-12 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </>
      )}

      {/* Main image */}
      <div
        className="relative h-[85vh] w-[90vw] max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ContentImage
          src={currentImage}
          alt={title || `Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          quality={90}
          intrinsicWidth={1600}
          intrinsicHeight={1200}
          priority
        />
      </div>
    </div>
  );
}
