"use client";

import { Modal } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

type CarouselImage = {
  imageName: string;
  imagePath: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  priority?: boolean;
};

const SWIPE_THRESHOLD = 40;

const ImagesCarousel = ({
  images,
  priority = false,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const lastImageTap = useRef(0);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const nextImage = useCallback(() => {
    if (!hasMultipleImages) return;

    setCurrentIndex((previous) => (previous + 1) % images.length);
    setZoom(1);
  }, [hasMultipleImages, images.length]);

  const previousImage = useCallback(() => {
    if (!hasMultipleImages) return;

    setCurrentIndex(
      (previous) => (previous - 1 + images.length) % images.length,
    );
    setZoom(1);
  }, [hasMultipleImages, images.length]);

  const goToImage = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return;

      setCurrentIndex(index);
      setZoom(1);
    },
    [images.length],
  );

  const openPreview = useCallback(() => {
    setZoom(1);
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    setZoom(1);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((previous) => Math.min(previous + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((previous) => Math.max(previous - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom((previous) => (previous === 1 ? 2 : 1));
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (touchStartX.current === null || !hasMultipleImages) return;

      const deltaX = event.changedTouches[0].clientX - touchStartX.current;

      if (deltaX > SWIPE_THRESHOLD) {
        previousImage();
      } else if (deltaX < -SWIPE_THRESHOLD) {
        nextImage();
      }

      touchStartX.current = null;
    },
    [hasMultipleImages, nextImage, previousImage],
  );

  const handleImageTap = useCallback(
    (event: TouchEvent<HTMLImageElement>) => {
      const currentTime = Date.now();
      const timeSinceLastTap = currentTime - lastImageTap.current;

      if (timeSinceLastTap < 350) {
        event.stopPropagation();
        toggleZoom();
        lastImageTap.current = 0;
        return;
      }

      lastImageTap.current = currentTime;
    },
    [toggleZoom],
  );
  useEffect(() => {
    if (!previewOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
        return;
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        previousImage();
        return;
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewOpen, hasMultipleImages, closePreview, previousImage, nextImage]);

  if (!hasImages) {
    return (
      <div className="flex aspect-4/3 w-full items-center justify-center rounded-[26px] bg-slate-100 sm:rounded-[30px]">
        <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
          <ImageOff className="h-8 w-8" />
          <span>ไม่มีรูปที่จะแสดง</span>
        </div>
      </div>
    );
  }

  const safeCurrentIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeCurrentIndex];

  return (
    <>
      <div
        className="relative aspect-4/3 w-full overflow-hidden rounded-[26px] bg-slate-100 shadow-md sm:aspect-16/10 sm:rounded-[30px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          aria-label="เปิดดูรูปภาพ"
          onClick={openPreview}
          className="absolute inset-0 z-1 cursor-zoom-in"
        />

        <Image
          key={`${currentImage.imagePath}-${currentIndex}`}
          src={currentImage.imagePath}
          alt={currentImage.imageName}
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover transition-transform duration-300"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="รูปก่อนหน้า"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/85 sm:left-6 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              type="button"
              aria-label="รูปถัดไป"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/85 sm:right-6 sm:h-12 sm:w-12"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between sm:bottom-5 sm:left-5 sm:right-5">
          <div className="max-w-[75%]">
            <p className="line-clamp-1 text-xs text-white/90 drop-shadow sm:text-sm">
              {currentImage.imageName}
            </p>
          </div>

          {hasMultipleImages && (
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
              {safeCurrentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
            {images.map((image, index) => (
              <button
                key={`${image.imagePath}-${index}`}
                type="button"
                aria-label={`ดูรูปที่ ${index + 1}`}
                onClick={(event) => {
                  event.stopPropagation();
                  goToImage(index);
                }}
                className={`rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "h-2 w-6 bg-white"
                    : "h-2 w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={previewOpen}
        onCancel={closePreview}
        footer={null}
        closable={false}
        centered
        width="100vw"
        styles={{
          mask: {
            background: "#000",
          },
          container: {
            width: "100vw",
            maxWidth: "100vw",
            height: "100dvh",
            margin: 0,
            padding: 0,
            background: "#000",
            boxShadow: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div
          className="fixed inset-0 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black"
          onClick={closePreview}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            aria-label="ปิด"
            onClick={closePreview}
            className="absolute right-4 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 sm:right-6 sm:top-6"
          >
            <X size={21} />
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                aria-label="รูปก่อนหน้า"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={26} />
              </button>

              <button
                type="button"
                aria-label="รูปถัดไป"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <div className="flex h-dvh w-screen items-center justify-center overflow-auto overscroll-contain px-12 py-16">
            <Image
              src={currentImage.imagePath}
              alt={currentImage.imageName}
              width={1600}
              height={1200}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              onTouchEnd={handleImageTap}
              onDoubleClick={(event) => {
                event.stopPropagation();
                toggleZoom();
              }}
              className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-[calc(100vw-6rem)] touch-manipulation select-none object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
              }}
            />
          </div>

          <div
            className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/70 p-1.5 shadow-lg backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="ซูมออก"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={18} />
            </button>

            <button
              type="button"
              aria-label="รีเซ็ตการซูม"
              onClick={resetZoom}
              className="flex h-9 min-w-14 items-center justify-center gap-1 rounded-full px-2 text-xs font-medium text-white transition-all hover:bg-white/20"
            >
              <RotateCcw size={15} />
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              aria-label="ซูมเข้า"
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={18} />
            </button>
          </div>

          {hasMultipleImages && (
            <div className="absolute bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 hidden max-w-[40%] -translate-x-1/2 truncate text-xs text-white/60 sm:block">
            {currentImage.imageName}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImagesCarousel;
