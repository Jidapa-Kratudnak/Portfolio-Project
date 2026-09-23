"use client";

import { Card } from "antd";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { activitiesData } from "../data/activitiesData";

const SWIPE_THRESHOLD = 40;

const ActivitiesCards = () => {
  const [currentImage, setCurrentImage] = useState<Record<string, number>>(
    {},
  );
  const [slideDirection, setSlideDirection] = useState<
    Record<string, "left" | "right">
  >({});
  const [zoomedKey, setZoomedKey] = useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!zoomedKey) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomedKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedKey]);

  const nextImage = (activityKey: string, totalImages: number) => {
    setSlideDirection((prev) => ({
      ...prev,
      [activityKey]: "left",
    }));

    setCurrentImage((prev) => ({
      ...prev,
      [activityKey]: ((prev[activityKey] ?? 0) + 1) % totalImages,
    }));
  };

  const previousImage = (activityKey: string, totalImages: number) => {
    setSlideDirection((prev) => ({
      ...prev,
      [activityKey]: "right",
    }));

    setCurrentImage((prev) => ({
      ...prev,
      [activityKey]:
        ((prev[activityKey] ?? 0) - 1 + totalImages) % totalImages,
    }));
  };

  const goToImage = (
    activityKey: string,
    index: number,
    currentIndex: number,
  ) => {
    if (index === currentIndex) return;

    setSlideDirection((prev) => ({
      ...prev,
      [activityKey]: index > currentIndex ? "left" : "right",
    }));

    setCurrentImage((prev) => ({
      ...prev,
      [activityKey]: index,
    }));
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: TouchEvent,
    activityKey: string,
    totalImages: number,
  ) => {
    if (touchStartX.current === null || totalImages <= 1) return;

    const deltaX =
      event.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > SWIPE_THRESHOLD) {
      previousImage(activityKey, totalImages);
    } else if (deltaX < -SWIPE_THRESHOLD) {
      nextImage(activityKey, totalImages);
    }

    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
      {activitiesData.map((activity, index) => {
        const activityKey = `${activity.activityName}-${index}`;
        const imageIndex = currentImage[activityKey] ?? 0;
        const direction = slideDirection[activityKey] ?? "left";

        return (
          <Card
            key={activityKey}
            className="
              h-auto!
              overflow-hidden!
              rounded-[28px]!
              border-0!
              shadow-lg!
              transition-shadow!
              duration-300!
              hover:shadow-2xl!
              sm:rounded-[32px]!
            "
            styles={{
              body: {
                height: "100%",
                padding: 0,
              },
            }}
          >
            <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)]">
              <div
                className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden bg-slate-100 sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-90"
                onTouchStart={handleTouchStart}
                onTouchEnd={(event) =>
                  handleTouchEnd(
                    event,
                    activityKey,
                    activity.activityImage.length,
                  )
                }
              >
                {activity.activityImage.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setZoomedKey(activityKey)}
                      aria-label="ดูภาพขยาย"
                      className="absolute inset-0 h-full w-full cursor-zoom-in"
                    >
                      <Image
                        key={`${activityKey}-${imageIndex}`}
                        src={activity.activityImage[imageIndex]}
                        alt={`${activity.activityName} ${imageIndex + 1}`}
                        fill
                        sizes="(min-width: 1024px) 44vw, 100vw"
                        className={`
                          object-cover
                          ${
                            direction === "left"
                              ? "animate-[slideFromRight_300ms_ease-out]"
                              : "animate-[slideFromLeft_300ms_ease-out]"
                          }
                        `}
                        priority={false}
                      />
                    </button>

                    <span className="pointer-events-none absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm sm:right-4 sm:top-4">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path
                          d="M21 21l-4.3-4.3M11 8v6M8 11h6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    {activity.activityImage.length > 1 && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
                    )}

                    {activity.activityImage.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          previousImage(
                            activityKey,
                            activity.activityImage.length,
                          )
                        }
                        aria-label="Previous image"
                        className="
                          absolute
                          left-3
                          top-1/2
                          z-10
                          flex
                          h-9
                          w-9
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-black
                          shadow-md
                          backdrop-blur-sm
                          transition
                          hover:bg-white
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-offset-2
                          focus-visible:outline-white
                          sm:left-4
                          sm:h-10
                          sm:w-10
                        "
                      >
                        <span className="text-2xl leading-none">‹</span>
                      </button>
                    )}

                    {activity.activityImage.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          nextImage(
                            activityKey,
                            activity.activityImage.length,
                          )
                        }
                        aria-label="Next image"
                        className="
                          absolute
                          right-3
                          top-1/2
                          z-10
                          flex
                          h-9
                          w-9
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-black
                          shadow-md
                          backdrop-blur-sm
                          transition
                          hover:bg-white
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-offset-2
                          focus-visible:outline-white
                          sm:right-4
                          sm:h-10
                          sm:w-10
                        "
                      >
                        <span className="text-2xl leading-none">›</span>
                      </button>
                    )}

                    {activity.activityImage.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-4">
                        {activity.activityImage.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              goToImage(
                                activityKey,
                                index,
                                imageIndex,
                              )
                            }
                            aria-label={`Go to image ${index + 1}`}
                            className={`
                              rounded-full
                              transition-all
                              duration-200
                              ${
                                imageIndex === index
                                  ? "h-2 w-6 bg-black"
                                  : "h-2 w-2 bg-black/40 hover:bg-black/70"
                              }
                            `}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-slate-500">
                      No Image Available
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-h-0 flex-col justify-center gap-3 p-6 sm:gap-4 sm:p-8 lg:p-10">
                <h2 className="text-xl font-bold leading-snug text-slate-800 sm:text-2xl lg:text-3xl">
                  {activity.activityName}
                </h2>

                <div>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                    {activity.activityDescription
                      .split("\n")
                      .map((desc, index) => (
                        <span key={index}>
                          {desc}
                          <br />
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {zoomedKey &&
        (() => {
          const activity = activitiesData.find(
            (activity, index) =>
              `${activity.activityName}-${index}` === zoomedKey,
          );

          if (
            !activity ||
            activity.activityImage.length === 0
          ) {
            return null;
          }

          const imageIndex = currentImage[zoomedKey] ?? 0;
          const total = activity.activityImage.length;

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
              onClick={() => setZoomedKey(null)}
            >
              <button
                type="button"
                onClick={() => setZoomedKey(null)}
                aria-label="ปิด"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white"
              >
                <span className="text-2xl leading-none">×</span>
              </button>

              <div
                className="relative flex h-full max-h-[85vh] w-full max-w-4xl items-center justify-center"
                onClick={(event) => event.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={(event) =>
                  handleTouchEnd(
                    event,
                    zoomedKey,
                    total,
                  )
                }
              >
                <Image
                  src={activity.activityImage[imageIndex]}
                  alt={`${activity.activityName} ${imageIndex + 1}`}
                  width={1200}
                  height={900}
                  sizes="90vw"
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                  priority={false}
                />

                {total > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        previousImage(
                          zoomedKey,
                          total,
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white sm:left-4"
                    >
                      <span className="text-2xl leading-none">
                        ‹
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        nextImage(
                          zoomedKey,
                          total,
                        )
                      }
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white sm:right-4"
                    >
                      <span className="text-2xl leading-none">
                        ›
                      </span>
                    </button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                      {activity.activityImage.map(
                        (_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              goToImage(
                                zoomedKey,
                                index,
                                imageIndex,
                              )
                            }
                            aria-label={`Go to image ${
                              index + 1
                            }`}
                            className={`rounded-full transition-all duration-200 ${
                              imageIndex === index
                                ? "h-2 w-6 bg-black"
                                : "h-2 w-2 bg-black/40 hover:bg-black/70"
                            }`}
                          />
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default ActivitiesCards;