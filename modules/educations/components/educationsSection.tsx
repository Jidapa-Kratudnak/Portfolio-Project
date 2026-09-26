import { Card } from "antd";
import Image from "next/image";
import { EducationsDataType } from "../types/educationsData";

type EducationsProps = {
  educationData: EducationsDataType;
};

const EducationsSection = ({ educationData }: EducationsProps) => {
  const data = educationData.educationList[0];

  return (
    <section className="w-full bg-linear-to-b px-4 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#3b302675] sm:text-base">
          Education
        </span>

        <h1 className="text-2xl font-bold text-[#3b3026] sm:text-4xl md:mt-4 md:text-5xl xl:text-5xl">
          ประวัติการศึกษา
        </h1>

        <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-[#8b6c52] to-[#604d3b] sm:w-28" />
      </div>

      <div className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
        <Card
          className="overflow-hidden! rounded-[40px]! border-0! shadow-xl! transition-shadow duration-300 hover:shadow-2xl! sm:rounded-[50px]!"
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:gap-10 sm:p-8 md:p-10 xl:grid-cols-[200px_1fr] xl:gap-10 xl:p-12">
            <div className="flex justify-center">
              <div className="flex h-32.5 w-32.5 items-center justify-center rounded-full bg-slate-50 p-4 shadow-inner ring-1 ring-slate-100 sm:h-37.5 sm:w-37.5 md:h-42.5 md:w-42.5">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_of_Silpakorn_University.svg"
                  alt={data.institution}
                  width={170}
                  height={170}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="text-center xl:text-left">
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl xl:text-4xl">
                {data.institution}
              </h2>

              <p className="mt-1 text-lg text-slate-500 sm:text-xl">
                {data.campus}
              </p>

              <div className="mt-5 space-y-2.5 text-base leading-7 text-slate-700 sm:text-lg">
                <p>
                  <span className="font-semibold text-slate-900">
                    คณะ:
                  </span>{" "}
                  {data.faculty}
                </p>

                <p>
                  <span className="font-semibold text-slate-900">
                    สาขา:
                  </span>{" "}
                  {data.major}
                </p>

                <p>
                  <span className="font-semibold text-slate-900">
                    ระยะเวลา:
                  </span>{" "}
                  ตั้งแต่ {data.startDate} ถึง {data.endDate}
                </p>

                <p>
                  <span className="font-semibold text-slate-900">
                    เกรดเฉลี่ยสะสม:
                  </span>{" "}
                  <span className="font-semibold text-[#734E30]">
                    {data.gpa}
                  </span>
                </p>

                {data.honors && (
                  <p className="inline-block rounded-full bg-[#8c735d] px-4 py-1 font-semibold text-white">
                    🏅 {data.honors}
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 text-lg font-semibold text-slate-800">
                  รายวิชาที่เกี่ยวข้อง
                </p>

                <div className="flex flex-wrap justify-center gap-2 xl:justify-start">
                  {data.relatedCourses.map((course, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-[#f1ebe4] px-3 py-1 text-sm font-medium text-[#734E30] sm:text-base"
                    >
                      {course}
                    </span>
                  ))}

                  <span className="rounded-full bg-[#f1ebe48e] px-3 py-1 text-sm font-medium text-[#734e3086] sm:text-base">
                    และอื่นๆ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EducationsSection;