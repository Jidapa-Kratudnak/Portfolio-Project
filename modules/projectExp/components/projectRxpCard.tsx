"use client";

import Image from "next/image";
import { Card } from "antd";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ProjectExpDataType } from "../types/projectExpDataType";
import { ImageOff } from "lucide-react";

interface ProjectExpCardProps {
  projectExpData: ProjectExpDataType[];
}

const SWIPE_THRESHOLD = 40;

const ProjectExpCard = ({ projectExpData }: ProjectExpCardProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [hasOverflow, setHasOverflow] = useState<Record<string, boolean>>({});
  const [currentImage, setCurrentImage] = useState<Record<string, number>>({});
  const [zoomedKey, setZoomedKey] = useState<string | null>(null);
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

  const touchStartX = useRef<number | null>(null);

  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>(
    {},
  );
  const technologiesRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const languageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkOverflow = () => {
      const result: Record<string, boolean> = {};

      projectExpData.forEach((project) => {
        const projectKey = `${project.ENprojectName}-${project.THprojectName}`;

        const description =
          descriptionRefs.current[`${projectKey}-description`];
        const technologies =
          technologiesRefs.current[`${projectKey}-technologies`];
        const language = languageRefs.current[`${projectKey}-language`];

        if (description) {
          result[`${projectKey}-description`] =
            description.scrollHeight > description.clientHeight;
        }

        if (technologies) {
          result[`${projectKey}-technologies`] =
            technologies.scrollHeight > technologies.clientHeight;
        }

        if (language) {
          result[`${projectKey}-language`] =
            language.scrollHeight > language.clientHeight;
        }
      });

      setHasOverflow(result);
    };

    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [projectExpData]);

  const toggleExpand = (key: string) => {
    setExpanded((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const previousImage = (projectKey: string, totalImages: number) => {
    setCurrentImage((previous) => ({
      ...previous,
      [projectKey]:
        ((previous[projectKey] ?? 0) - 1 + totalImages) % totalImages,
    }));
  };

  const nextImage = (projectKey: string, totalImages: number) => {
    setCurrentImage((previous) => ({
      ...previous,
      [projectKey]: ((previous[projectKey] ?? 0) + 1) % totalImages,
    }));
  };

  const goToImage = (projectKey: string, index: number) => {
    setCurrentImage((previous) => ({
      ...previous,
      [projectKey]: index,
    }));
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: TouchEvent,
    projectKey: string,
    totalImages: number,
  ) => {
    if (touchStartX.current === null || totalImages <= 1) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > SWIPE_THRESHOLD) {
      previousImage(projectKey, totalImages);
    } else if (deltaX < -SWIPE_THRESHOLD) {
      nextImage(projectKey, totalImages);
    }

    touchStartX.current = null;
  };

  return (
    <>
      {projectExpData.map((project) => {
        const projectKey = `${project.ENprojectName}-${project.THprojectName}`;
        const imageURLs = project.imageURL ?? [];
        const imageIndex = currentImage[projectKey] ?? 0;

        const descriptionExpanded =
          expanded[`${projectKey}-description`] ?? false;
        const technologiesExpanded =
          expanded[`${projectKey}-technologies`] ?? false;
        const languageExpanded = expanded[`${projectKey}-language`] ?? false;

        const descriptionOverflow =
          hasOverflow[`${projectKey}-description`] ?? false;
        const technologiesOverflow =
          hasOverflow[`${projectKey}-technologies`] ?? false;
        const languageOverflow = hasOverflow[`${projectKey}-language`] ?? false;

        return (
          <div key={projectKey} className="mb-10">
            <Card
              className={`
                overflow-hidden!
                rounded-4xl!
                border-0!
                shadow-xl!
                sm:rounded-[40px]!
                ${
                  descriptionExpanded ||
                  technologiesExpanded ||
                  languageExpanded
                    ? "lg:min-h-150!"
                    : "lg:h-150!"
                }
              `}
              styles={{
                body: {
                  height: "100%",
                  padding: 0,
                },
              }}
            >
              <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                <div
                  className="relative min-h-70 touch-pan-y overflow-hidden bg-slate-100 sm:min-h-87.5 lg:h-full"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(event) =>
                    handleTouchEnd(event, projectKey, imageURLs.length)
                  }
                >
                  {imageURLs.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setZoomedKey(projectKey)}
                        aria-label="ดูภาพขยาย"
                        className="absolute inset-0 h-full w-full cursor-zoom-in"
                      >
                        <Image
                          key={`${projectKey}-${imageIndex}`}
                          src={imageURLs[imageIndex]}
                          alt={`${project.ENprojectName} image ${imageIndex + 1}`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-contain"
                        />
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
                      </button>

                      {imageURLs.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              previousImage(projectKey, imageURLs.length)
                            }
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
                          >
                            ‹
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              nextImage(projectKey, imageURLs.length)
                            }
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
                          >
                            ›
                          </button>

                          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                            {imageURLs.map((imageURL, index) => (
                              <button
                                key={`${imageURL}-${index}`}
                                type="button"
                                onClick={() => goToImage(projectKey, index)}
                                aria-label={`Go to image ${index + 1}`}
                                className={`h-2 rounded-full transition-all ${
                                  imageIndex === index
                                    ? "w-6 bg-white"
                                    : "w-2 bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                    <span className="flex flex-col items-center justify-center gap-2 text-slate-500">
                      <ImageOff className="h-8 w-8" />
                      <span>ไม่มีรูปที่จะแสดง</span>
                    </span>
                  </div>
                  )}
                </div>

                <div className="flex min-h-0 flex-col p-6 sm:p-8 md:p-10">
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    {project.ENprojectName}
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                    {project.THprojectName}
                  </h2>

                  <div className="mt-4">
                    <p
                      ref={(element) => {
                        descriptionRefs.current[`${projectKey}-description`] =
                          element;
                      }}
                      className={`text-base leading-7 text-slate-600 sm:text-lg ${
                        descriptionExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {project.description.map((description, index) => (
                        <span key={index}>
                          • {description}
                          <br />
                        </span>
                      ))}
                    </p>

                    {descriptionOverflow && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleExpand(`${projectKey}-description`)
                        }
                        className="mt-2 text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-800"
                      >
                        {descriptionExpanded ? "ย่อ" : "เพิ่มเติม"}
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 pt-2 font-medium">
                        Technologies:
                      </span>

                      <div
                        ref={(element) => {
                          technologiesRefs.current[
                            `${projectKey}-technologies`
                          ] = element;
                        }}
                        className={`flex flex-1 flex-wrap gap-2 overflow-hidden ${
                          technologiesExpanded ? "" : "max-h-20"
                        }`}
                      >
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    {technologiesOverflow && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            toggleExpand(`${projectKey}-technologies`)
                          }
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-800"
                        >
                          {technologiesExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 pt-2 font-medium">
                        Language:
                      </span>

                      <div
                        ref={(element) => {
                          languageRefs.current[`${projectKey}-language`] =
                            element;
                        }}
                        className={`flex flex-1 flex-wrap gap-2 overflow-hidden ${
                          languageExpanded ? "" : "max-h-20"
                        }`}
                      >
                        {project.language.map((language) => (
                          <span
                            key={language}
                            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    {languageOverflow && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => toggleExpand(`${projectKey}-language`)}
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-800"
                        >
                          {languageExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end pt-6">
                    <button
                      type="button"
                      disabled
                      className="w-fit shrink-0 rounded-full! bg-[#6c5846] px-6 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      ตรวจสอบ Project
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
      {zoomedKey &&
  (() => {
    const project = projectExpData.find(
      (item) =>
        `${item.ENprojectName}-${item.THprojectName}` === zoomedKey,
    );

    if (!project) return null;

    const imageURLs = project.imageURL ?? [];
    const imageIndex = currentImage[zoomedKey] ?? 0;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
        onClick={() => setZoomedKey(null)}
      >
        <button
          type="button"
          onClick={() => setZoomedKey(null)}
          aria-label="ปิดภาพขยาย"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md hover:bg-white"
        >
          ×
        </button>

        <div
          className="relative flex h-full max-h-[85vh] w-full max-w-6xl items-center justify-center"
          onClick={(event) => event.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={(event) =>
            handleTouchEnd(event, zoomedKey, imageURLs.length)
          }
        >
          <Image
            src={imageURLs[imageIndex]}
            alt={`${project.ENprojectName} image ${imageIndex + 1}`}
            width={1600}
            height={1200}
            sizes="90vw"
            className="max-h-[85vh] w-auto max-w-full object-contain"
          />

          {imageURLs.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  previousImage(zoomedKey, imageURLs.length)
                }
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md hover:bg-white sm:left-4"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() =>
                  nextImage(zoomedKey, imageURLs.length)
                }
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md hover:bg-white sm:right-4"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {imageURLs.map((imageURL, index) => (
                  <button
                    key={`${imageURL}-${index}`}
                    type="button"
                    onClick={() => goToImage(zoomedKey, index)}
                    aria-label={`Go to image ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      imageIndex === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  })()}
    </>
  );
};

export default ProjectExpCard;
