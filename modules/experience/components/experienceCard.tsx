"use client";

import { Button, Card, ConfigProvider, Modal, Timeline } from "antd";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";
import { ExperienceData } from "../types/experienceDataType";

type ExperienceCardProps = {
  experienceData: ExperienceData[];
};

const SWIPE_THRESHOLD = 40;

const ExperienceCard = ({ experienceData }: ExperienceCardProps) => {
  const [currentImages, setCurrentImages] = useState<Record<string, number>>(
    {},
  );

  const [preview, setPreview] = useState<{
    experienceId: string;
    imageIndex: number;
  } | null>(null);

  const [certificatePreview, setCertificatePreview] = useState<string | null>(
    null,
  );

  const [zoom, setZoom] = useState(1);
  const [certificateZoom, setCertificateZoom] = useState(1);

  const touchStartX = useRef<number | null>(null);

  const getCurrentImageIndex = (experienceId: string) => {
    return currentImages[experienceId] ?? 0;
  };

  const nextImage = (experienceId: string, total: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [experienceId]: ((prev[experienceId] ?? 0) + 1) % total,
    }));
  };

  const previousImage = (experienceId: string, total: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [experienceId]: ((prev[experienceId] ?? 0) - 1 + total) % total,
    }));
  };

  const goToImage = (experienceId: string, index: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [experienceId]: index,
    }));
  };

  const openPreview = (experienceId: string, imageIndex: number) => {
    setPreview({
      experienceId,
      imageIndex,
    });

    setZoom(1);
  };

  const closePreview = () => {
    setPreview(null);
    setZoom(1);
  };

  const openCertificatePreview = (certificateLink: string) => {
    setCertificatePreview(certificateLink);
    setCertificateZoom(1);
  };

  const closeCertificatePreview = () => {
    setCertificatePreview(null);
    setCertificateZoom(1);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const certificateZoomIn = () => {
    setCertificateZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const certificateZoomOut = () => {
    setCertificateZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetCertificateZoom = () => {
    setCertificateZoom(1);
  };

  const nextPreviewImage = () => {
    if (!preview) return;

    const experience = experienceData.find(
      (item) => item.id === preview.experienceId,
    );

    if (!experience || experience.images.length <= 1) return;

    setPreview((prev) =>
      prev
        ? {
            ...prev,
            imageIndex: (prev.imageIndex + 1) % experience.images.length,
          }
        : null,
    );

    setZoom(1);
  };

  const previousPreviewImage = () => {
    if (!preview) return;

    const experience = experienceData.find(
      (item) => item.id === preview.experienceId,
    );

    if (!experience || experience.images.length <= 1) return;

    setPreview((prev) =>
      prev
        ? {
            ...prev,
            imageIndex:
              (prev.imageIndex - 1 + experience.images.length) %
              experience.images.length,
          }
        : null,
    );

    setZoom(1);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: TouchEvent,
    experienceId: string,
    total: number,
  ) => {
    if (touchStartX.current === null || total <= 1) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > SWIPE_THRESHOLD) {
      previousImage(experienceId, total);
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      nextImage(experienceId, total);
    }

    touchStartX.current = null;
  };

  const previewExperience = preview
    ? experienceData.find(
        (experience) => experience.id === preview.experienceId,
      )
    : null;

  const previewImage = previewExperience?.images[preview?.imageIndex ?? 0];

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-1 sm:px-4 md:px-6 xl:px-8">
        <ConfigProvider
          theme={{
            components: {
              Timeline: {
                dotBg: "#6c5846",
                dotBorderWidth: 4,
                dotSize: 18,
                tailColor: "#d8cbbd",
                tailWidth: 3,
              },
            },
          }}
        >
          <Timeline
            items={[
              ...experienceData.map((experience, index) => {
                const imageIndex = getCurrentImageIndex(experience.id);
                const hasImages = experience.images?.length > 0;
                const totalImages = experience.images?.length ?? 0;

                return {
                  color: "#6c5846",

                  content: (
                    <Card
                      key={experience.id}
                      className="mb-6! overflow-hidden! rounded-4xl! border-0! shadow-lg! transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl! sm:mb-8! sm:rounded-[40px]!"
                      styles={{
                        body: {
                          padding: 0,
                        },
                      }}
                    >
                      <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 xl:grid-cols-2 xl:gap-8 xl:p-7">
                        <div
                          className={`relative aspect-4/3 w-full overflow-hidden rounded-[26px] bg-slate-100 shadow-md sm:aspect-16/10 sm:rounded-[30px] xl:aspect-auto xl:min-h-100 ${
                            index % 2 === 1 ? "xl:order-2" : "xl:order-1"
                          }`}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={(event) =>
                            handleTouchEnd(event, experience.id, totalImages)
                          }
                        >
                          {hasImages ? (
                            <>
                              <button
                                type="button"
                                className="absolute inset-0 z-1 cursor-zoom-in"
                                aria-label="เปิดดูรูปภาพ"
                                onClick={() =>
                                  openPreview(experience.id, imageIndex)
                                }
                              />

                              <Image
                                key={`${experience.id}-${imageIndex}`}
                                src={experience.images[imageIndex].imagePath}
                                alt={experience.images[imageIndex].imageName}
                                fill
                                sizes="(min-width: 1280px) 50vw, 100vw"
                                className="object-cover transition-transform duration-300"
                              />

                              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

                              {totalImages > 1 && (
                                <>
                                  <button
                                    type="button"
                                    aria-label="รูปก่อนหน้า"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      previousImage(experience.id, totalImages);
                                    }}
                                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6c5846] shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
                                  >
                                    <ChevronLeft size={21} />
                                  </button>

                                  <button
                                    type="button"
                                    aria-label="รูปถัดไป"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      nextImage(experience.id, totalImages);
                                    }}
                                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#6c5846] shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
                                  >
                                    <ChevronRight size={21} />
                                  </button>
                                </>
                              )}

                              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-2 flex items-end justify-between sm:bottom-5 sm:left-5 sm:right-5">
                                <div className="max-w-[75%]">
                                  <p className="mt-1 line-clamp-1 text-xs text-white/90 drop-shadow sm:text-sm">
                                    {experience.images[imageIndex].imageName}
                                  </p>
                                </div>

                                {totalImages > 1 && (
                                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                                    {imageIndex + 1} / {totalImages}
                                  </span>
                                )}
                              </div>

                              {totalImages > 1 && (
                                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
                                  {experience.images.map((_, dotIndex) => (
                                    <button
                                      key={dotIndex}
                                      type="button"
                                      aria-label={`ดูรูปที่ ${dotIndex + 1}`}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        goToImage(experience.id, dotIndex);
                                      }}
                                      className={`rounded-full transition-all duration-200 ${
                                        dotIndex === imageIndex
                                          ? "h-2 w-6 bg-white"
                                          : "h-2 w-2 bg-white/50 hover:bg-white/80"
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex h-full min-h-65 items-center justify-center text-sm text-slate-400 sm:min-h-75">
                              <span className="flex flex-col items-center justify-center gap-2 text-slate-500">
                                <ImageOff className="h-8 w-8" />
                                <span>ไม่มีรูปที่จะแสดง</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <div
                          className={`relative flex min-h-0 flex-col ${
                            index % 2 === 1 ? "xl:order-1" : "xl:order-2"
                          }`}
                        >
                          <div className="mb-5 flex justify-end sm:mb-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#f1ebe4] px-4 py-2 text-sm font-medium text-[#6c5846] sm:text-base">
                              <CalendarDays size={17} className="shrink-0" />

                              <span>
                                {experience.startDate} - {experience.endDate}
                              </span>
                            </div>
                          </div>

                          <div className="border-b border-slate-100 pb-5 sm:pb-6">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1ebe4]">
                                <Building2
                                  size={22}
                                  className="text-[#6c5846]"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="flex items-start gap-2 text-2xl font-bold leading-tight text-slate-800 sm:text-2xl">
                                  <span className="wrap-break-word">
                                    {experience.company}
                                  </span>
                                </p>

                                <p className="mt-2 flex items-start gap-2 text-base font-medium text-[#6c5846] sm:text-lg">
                                  <BriefcaseBusiness
                                    size={19}
                                    className="mt-1 shrink-0"
                                  />

                                  <span className="wrap-break-word">
                                    {experience.position}
                                  </span>
                                </p>

                                <p className="mt-1.5 flex items-start gap-2 text-sm text-slate-500 sm:text-base">
                                  <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                  />

                                  <span className="wrap-break-word">
                                    {experience.location}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex-1 sm:mt-6">
                            <p className="mb-4 text-base font-semibold text-slate-800 sm:text-lg">
                              หน้าที่และประสบการณ์
                            </p>

                            <ul className="space-y-3 sm:space-y-3.5">
                              {experience.description.map(
                                (description, descriptionIndex) => (
                                  <li
                                    key={descriptionIndex}
                                    className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base md:text-lg"
                                  >
                                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6c5846]" />

                                    <span className="min-w-0 wrap-break-word">
                                      {description}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>

                          {experience.certificateLink && (
                            <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
                              <Button
                                type="default"
                                icon={<Award size={18} />}
                                className="h-auto! w-full! rounded-full! border-[#6c5846]! bg-[#6c5846]! px-5! py-2.5! text-white! transition-all duration-200 hover:-translate-y-1 hover:bg-white! hover:*:text-[#6c5846]! sm:w-auto!"
                                onClick={() =>
                                  openCertificatePreview(
                                    experience.certificateLink,
                                  )
                                }
                              >
                                ตรวจสอบเกียรติบัตร
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ),
                };
              }),

              {
                icon: (
                  <div className="flex h-5 w-5 items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#6c5846]/20 border-t-[#6c5846]" />
                  </div>
                ),
                content: (
                  <div className="pb-4 pt-1 text-sm font-medium text-[#3b302675] sm:text-base">
                    ยังไม่มีประสบการณ์เพิ่มเติมในขณะนี้...
                  </div>
                ),
              },
            ]}
          />
        </ConfigProvider>
      </div>

      <Modal
        open={preview !== null}
        onCancel={closePreview}
        footer={null}
        closable={false}
        centered
        width="100vw"
        styles={{
          mask: {
            backgroundColor: "#000",
          },
          container: {
            padding: 0,
            background: "#000",
            borderRadius: 0,
            boxShadow: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div className="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black">
          {previewImage && (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center overflow-auto px-4 py-20 sm:px-8 sm:py-20">
                <div
                  className="relative flex shrink-0 items-center justify-center transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom})`,
                  }}
                >
                  <Image
                    src={previewImage.imagePath}
                    alt={previewImage.imageName}
                    width={1800}
                    height={1400}
                    draggable={false}
                    className="max-h-[calc(100dvh-180px)] max-w-[calc(100vw-32px)] select-none object-contain sm:max-h-[calc(100dvh-160px)] sm:max-w-[calc(100vw-64px)]"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-end pt-4 pr-4 sm:pt-6 sm:pr-6">
                {" "}
                <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 p-1.5 shadow-lg backdrop-blur-md">
                  <button
                    type="button"
                    aria-label="ปิด"
                    onClick={closePreview}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95"
                  >
                    <X size={21} />
                  </button>
                </div>
              </div>

              {previewExperience && previewExperience.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="รูปก่อนหน้า"
                    onClick={previousPreviewImage}
                    className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:left-6 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft size={26} />
                  </button>

                  <button
                    type="button"
                    aria-label="รูปถัดไป"
                    onClick={nextPreviewImage}
                    className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:right-6 sm:h-12 sm:w-12"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}

              <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1.5 shadow-lg backdrop-blur-md sm:bottom-7">
                <button
                  type="button"
                  aria-label="ซูมออก"
                  onClick={zoomOut}
                  disabled={zoom <= 0.5}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>

                <button
                  type="button"
                  aria-label="รีเซ็ตการซูม"
                  onClick={resetZoom}
                  className="flex h-9 min-w-16 items-center justify-center gap-1 rounded-full px-2 text-xs font-medium text-white transition hover:bg-white/20 active:scale-95"
                >
                  <RotateCcw size={15} />
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  aria-label="ซูมเข้า"
                  onClick={zoomIn}
                  disabled={zoom >= 3}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={18} />
                </button>
              </div>

              {previewExperience && previewExperience.images.length > 1 && (
                <div className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 translate-y-9 text-xs text-white/60">
                  {(preview?.imageIndex ?? 0) + 1} /{" "}
                  {previewExperience.images.length}
                </div>
              )}

              <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-xs text-white/40 sm:bottom-22">
                คลิกปุ่ม + / − เพื่อซูม
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        open={certificatePreview !== null}
        onCancel={closeCertificatePreview}
        footer={null}
        closable={false}
        centered
        width="100vw"
        styles={{
          mask: {
            backgroundColor: "#000",
          },
          container: {
            padding: 0,
            background: "#000",
            borderRadius: 0,
            boxShadow: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div className="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center overflow-hidden bg-black">
          {certificatePreview && (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center overflow-auto px-4 py-20 sm:px-8 sm:py-20">
                <div
                  className="relative flex shrink-0 items-center justify-center transition-transform duration-200"
                  style={{
                    transform: `scale(${certificateZoom})`,
                  }}
                >
                  <Image
                    src={certificatePreview}
                    alt="เกียรติบัตร"
                    width={1800}
                    height={1400}
                    draggable={false}
                    className="max-h-[calc(100dvh-180px)] max-w-[calc(100vw-32px)] select-none object-contain sm:max-h-[calc(100dvh-160px)] sm:max-w-[calc(100vw-64px)]"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-end px-4 pt-4 sm:px-6 sm:pt-6">
                <div className="pointer-events-auto flex items-center rounded-full bg-white/10 p-1.5 shadow-lg backdrop-blur-md">
                  <button
                    type="button"
                    aria-label="ปิด"
                    onClick={closeCertificatePreview}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95"
                  >
                    <X size={21} />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1.5 shadow-lg backdrop-blur-md sm:bottom-7">
                <button
                  type="button"
                  aria-label="ซูมออก"
                  onClick={certificateZoomOut}
                  disabled={certificateZoom <= 0.5}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>

                <button
                  type="button"
                  aria-label="รีเซ็ตการซูม"
                  onClick={resetCertificateZoom}
                  className="flex h-9 min-w-16 items-center justify-center gap-1 rounded-full px-2 text-xs font-medium text-white transition hover:bg-white/20 active:scale-95"
                >
                  <RotateCcw size={15} />
                  {Math.round(certificateZoom * 100)}%
                </button>

                <button
                  type="button"
                  aria-label="ซูมเข้า"
                  onClick={certificateZoomIn}
                  disabled={certificateZoom >= 3}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-xs text-white/40 sm:bottom-22">
                คลิกปุ่ม + / − เพื่อซูม
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ExperienceCard;
