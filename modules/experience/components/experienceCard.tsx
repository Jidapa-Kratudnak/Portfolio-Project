"use client";

import { Button, Card, ConfigProvider, Modal, Timeline } from "antd";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImagesCarousel from "@/components/imagesCarousel";
import { ExperienceData } from "../types/experienceDataType";

type ExperienceCardProps = {
  experienceData: ExperienceData[];
};

const ExperienceCard = ({ experienceData }: ExperienceCardProps) => {
  const [certificatePreview, setCertificatePreview] = useState<string | null>(
    null,
  );

  const [certificateZoom, setCertificateZoom] = useState(1);

  const openCertificatePreview = (certificateLink: string) => {
    setCertificatePreview(certificateLink);
    setCertificateZoom(1);
  };

  const closeCertificatePreview = () => {
    setCertificatePreview(null);
    setCertificateZoom(1);
  };

  const certificateZoomIn = () => {
    setCertificateZoom((previous) => Math.min(previous + 0.25, 3));
  };

  const certificateZoomOut = () => {
    setCertificateZoom((previous) => Math.max(previous - 0.25, 0.5));
  };

  const resetCertificateZoom = () => {
    setCertificateZoom(1);
  };

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
                return {
                  color: "#6c5846",
                  content: (
                    <>
                      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#6c5846] sm:mb-6 sm:text-base">
                        <CalendarDays size={17} className="shrink-0" />

                        <span>
                          {experience.startDate} - {experience.endDate}
                        </span>
                      </div>
                      <Card
                        key={experience.id}
                        className="mb-6! overflow-hidden! rounded-4xl! border-0! shadow-lg! transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl! sm:mb-8! sm:rounded-[40px]!"
                        styles={{
                          body: {
                            padding: 0,
                          },
                        }}
                      >
                        <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 xl:gap-8 xl:p-7">
                          <div
                            className={`flex w-full items-center justify-center ${
                              index % 2 === 1 ? "xl:order-2" : "xl:order-1"
                            }`}
                          >
                            <div className="w-full max-w-full ">
                              <ImagesCarousel
                                images={experience.images ?? []}
                                priority
                              />
                            </div>
                          </div>

                          <div
                            className={`relative flex min-h-0 flex-col ${
                              index % 2 === 1 ? "xl:order-1" : "xl:order-2"
                            }`}
                          >
                            <div className="border-b border-slate-100 pb-5 sm:pb-6">
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1ebe4]">
                                  <Building2
                                    size={22}
                                    className="text-[#6c5846]"
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="flex items-start gap-2 text-base font-bold leading-tight text-slate-800 sm:text-2xl">
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

                                  <p className="mt-1.5 flex items-start gap-2 text-sm text-[#6c5846] sm:text-base">
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
                    </>
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
