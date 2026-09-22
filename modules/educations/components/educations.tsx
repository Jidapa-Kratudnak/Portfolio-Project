import { Card } from "antd";
import { EducationsDataType } from "../types/educationsData";
import Image from "next/image";

const Educations = (educationData: EducationsDataType) => {
  const data = educationData.educationList[0];

  return (
    <section className="w-full bg-gradient-to-b  px-4 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-base">
          Education
        </span>
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl xl:text-[65px]">
          ประวัติการศึกษา
        </h1>
        <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 sm:w-28" />
      </div>    

      <div className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
        <Card
          className="!overflow-hidden !rounded-[32px] !border-0 !shadow-xl transition-shadow duration-300 hover:!shadow-2xl sm:!rounded-[40px]"
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:grid-cols-[200px_1fr] md:gap-10 md:p-10 lg:p-12">
            {/* Logo: order-1 บนมือถือ = อยู่บนสุดเสมอ */}
            <div className="order-1 flex justify-center md:order-none">
              <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-slate-50 p-4 shadow-inner ring-1 ring-slate-100 sm:h-[150px] sm:w-[150px] md:h-[170px] md:w-[170px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_of_Silpakorn_University.svg"
                  alt={data.institution}
                  width={170}
                  height={170}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* เนื้อหา: order-2 บนมือถือ = อยู่ล่างเสมอ */}
            <div className="order-2 text-center md:order-none md:text-left">
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
                {data.institution}
              </h2>

              <p className="mt-1 text-lg text-slate-500 sm:text-xl lg:text-2xl">
                {data.campus}
              </p>

              <div className="mt-5 space-y-2.5 text-base leading-7 text-slate-700 sm:text-lg lg:text-xl">
                <p>
                  <span className="font-semibold text-slate-900">คณะ:</span>{" "}
                  {data.faculty}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">สาขา:</span>{" "}
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
                  <span className="font-semibold text-blue-600">
                    {data.gpa}
                  </span>
                </p>
                {data.honors && (
                  <p className="inline-block rounded-full bg-amber-50 px-4 py-1 font-semibold text-amber-600">
                    🏅 {data.honors}
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 font-semibold text-lg text-slate-800">
                  รายวิชาที่เกี่ยวข้อง
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {data.relatedCourses.map((course, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 sm:text-base"
                    >
                      {course}
                    </span>
                  ))}
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-400 sm:text-base">
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

export default Educations;