"use client";

import { Card } from "antd";
import ImagesCarousel from "@/components/imagesCarousel";
import { ActivitiesDataType } from "../type/activitiesDataType";

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const formatThaiDate = (value: Date) => {
  const date = new Date(value);

  return `${date.getUTCDate()} ${
    thaiMonths[date.getUTCMonth()]
  } ${date.getUTCFullYear() + 543}`;
};

type ActivitiesCardsProps = {
  activitiesData: ActivitiesDataType[];
};

const ActivitiesCards = ({ activitiesData }: ActivitiesCardsProps) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 xl:gap-12">
      {activitiesData.map((activity, index) => {
        const activityImages = activity.activityImage.map(
          (imagePath, imageIndex) => ({
            imageName: `${activity.activityName} ${imageIndex + 1}`,
            imagePath,
          }),
        );

        return (
          <Card
            key={`${activity.activityName}-${index}`}
            className="h-auto! overflow-hidden! rounded-[40px]! border-0! shadow-xl! transition-shadow! duration-300! hover:shadow-2xl! sm:rounded-[50px]!"
            styles={{
              body: {
                height: "100%",
                padding: 0,
              },
            }}
          >
            <div className="grid h-full grid-cols-1 xl:grid-cols-[minmax(0,44%)_minmax(0,56%)]">
              <div className="w-full">
                <ImagesCarousel images={activityImages} />
              </div>

              <div className="relative flex min-h-0 flex-col justify-center gap-3 p-6 pt-16 sm:gap-4 sm:p-8 sm:pt-16 xl:p-10 xl:pt-16">
                <span className="absolute right-6 top-6 text-sm font-medium text-[#6c5846] sm:right-8 sm:top-8 sm:text-base xl:right-10 xl:top-10">
                  {activity.activityStartDate ? (
                    <>
                      {formatThaiDate(activity.activityStartDate)}

                      {activity.activityEndDate && (
                        <>{" - "}{formatThaiDate(activity.activityEndDate)}</>
                      )}
                    </>
                  ) : (
                    "ยังไม่ระบุวันที่"
                  )}
                </span>

                <h2 className="text-xl font-bold leading-snug text-slate-800 sm:text-2xl">
                  {activity.activityName}
                </h2>

                <div>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base xl:text-lg">
                    {activity.activityDescription
                      .split("\n")
                      .map((description, descriptionIndex) => (
                        <span key={descriptionIndex}>
                          {description}
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
    </div>
  );
};

export default ActivitiesCards;