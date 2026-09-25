"use client";

import { Button, Card, ConfigProvider, Timeline } from "antd";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { ExperienceData } from "../types/experienceDataType";

type ExperienceCardProps = {
  experienceData: ExperienceData[];
};

const ExperienceCard = ({ experienceData }: ExperienceCardProps) => {
  return (
    <div className="p-2 sm:p-8 lg:p-12">
      <ConfigProvider
        theme={{
          components: {
            Timeline: {
              dotBg: "#6c5846",
              dotBorderWidth: 4,
              dotSize: 18,
              tailColor: "#6c5846",
              tailWidth: 3,
            },
          },
        }}
      >
        <Timeline
          items={[
            ...experienceData.map((experience) => ({
              color: "#6c5846",
              content: (
                <Card
                  className="mb-4! rounded-3xl! border-0! shadow-md! transition-all duration-300 hover:-translate-y-1 hover:shadow-xl! sm:mb-6! sm:rounded-[30px]!"
                  styles={{
                    body: {
                      padding: 0,
                    },
                  }}
                >
                  <div className="flex flex-col p-4 sm:p-7 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500 sm:mb-4 sm:text-base">
                      <CalendarDays size={18} className="shrink-0" />

                      <span>
                        {experience.startDate} - {experience.endDate}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-1 shrink-0">
                        <Building2 size={24} className="text-[#6c5846]" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="wrap-break-word text-lg font-bold leading-tight text-slate-800 sm:text-2xl lg:text-3xl">
                          {experience.company}
                        </h2>

                        <p className="mt-2 flex items-center gap-2 font-medium text-[#6c5846] sm:text-lg">
                          <MapPin size={18} className="shrink-0" />
                          <span className="wrap-break-word">
                            {experience.location}
                          </span>
                        </p>
                        <p className="mt-2 flex items-center gap-2 font-medium text-[#6c5846] sm:text-lg">
                          <BriefcaseBusiness size={18} className="shrink-0" />
                          <span className="wrap-break-word">
                            {experience.position}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6">
                      <ul className="space-y-2 text-sm leading-7 text-slate-600 sm:space-y-3 sm:text-base lg:text-[20px]">
                        {experience.description.map((description, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6c5846]" />

                            <span className="min-w-0 wrap-break-word">
                              {description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex sm:mt-7 sm:justify-end">
                      {experience.certificateLink && (
                        <Button
                          type="default"
                          icon={<Award size={18} />}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-auto! w-full! rounded-full! border-[#6c5846]! bg-[#6c5846]! px-5! py-2.5! text-white! transition-all duration-200 hover:-translate-y-1  hover:*:text-[#6c5846] hover:*:border-[#6c5846] hover:bg-white! sm:w-auto!"
                          onClick={() => {
                            window.open(experience.certificateLink, "_blank");
                          }}
                        >
                          ตรวจสอบเกียรติบัตร
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ),
            })),
            {
              icon: (
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#6c5846]/20 border-t-[#6c5846]" />
                </div>
              ),

              content: (
                <div className="py-2 text-sm font-medium text-[#3b302675]">
                  ยังไม่มีประสบการณ์เพิ่มเติมในขณะนี้...
                </div>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default ExperienceCard;
