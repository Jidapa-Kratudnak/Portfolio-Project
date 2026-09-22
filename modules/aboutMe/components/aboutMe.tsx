import { Card, Divider } from "antd";
import {
  ContactRound,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { AboutMeDataType } from "../types/aboutMeDataType";

const AboutMeSection = (aboutMeData: AboutMeDataType) => {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className=" text-3xl font-bold sm:p-12 sm:text-4xl md:mt-16 md:text-5xl lg:mt-7 lg:text-6xl xl:text-[65px]">
          เกี่ยวกับฉัน / About Me
        </h1>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:px-10 lg:gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <div className="flex justify-center">
            <Card
              className="!w-full !max-w-[400px] !rounded-[40px] !shadow-lg sm:!rounded-[50px] md:!rounded-[55px]"
              styles={{
                body: {
                  padding: "24px",
                },
              }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={aboutMeData.profileImage}
                  alt="Jidapa Katudnak"
                  width={300}
                  height={300}
                  className="h-auto w-full max-w-[300px] rounded-[40px] sm:rounded-[50px]"
                />
              </div>
            </Card>
          </div>

          <Card
            className="flex! w-full! items-center! !justify-center !rounded-[40px] !shadow-lg sm:!rounded-[50px]"
            styles={{
              body: {
                padding: "20px",
              },
            }}
          >
            <div className="space-y-5 p-2 sm:p-3 md:p-5">
              <div className="flex items-start gap-3">
                <UserRound size={21} className="mt-1 shrink-0" />

                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 sm:w-[110px] sm:font-medium md:w-[130px] lg:text-lg">
                    ชื่อ-นามสกุล
                  </span>

                  <span className="wrap-break-word *:sm:font-medium lg:text-[20px]">
                    {aboutMeData.THfirstName} {aboutMeData.THlastName}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={21} className="mt-1 shrink-0" />

                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 sm:w-[110px] sm:font-medium md:w-[130px] lg:text-[20px]">
                    เบอร์โทรศัพท์
                  </span>

                  <span className="wrap-break-word *:sm:font-medium lg:text-lg">
                    {aboutMeData.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={21} className="mt-1 shrink-0" />

                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 sm:w-[110px] sm:font-medium md:w-[130px] lg:text-[20px]">
                    E-mail
                  </span>

                  <span className="break-all *:sm:font-medium lg:text-[20px]">
                    {aboutMeData.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={21} className="mt-1 shrink-0" />

                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 *:sm:font-medium sm:w-[110px] md:w-[130px] lg:text-[20px]">
                    ที่อยู่
                  </span>

                  <span className="wrap-break-word *:sm:font-medium lg:text-[20px]">
                    {aboutMeData.address}
                  </span>
                </div>
              </div>
            </div>

            <Divider className="!mx-auto !my-6 !w-[80%] !border-t-[2px] !border-[#22231A]/20" />

            <div className="flex flex-col gap-3 p-2 text-base sm:grid sm:grid-cols-[minmax(110px,150px)_1fr] sm:gap-x-4 sm:p-5 sm:text-lg lg:text-[20px]">
              <p className="flex items-center gap-2 sm:font-medium lg:text-[20px]">
                <ContactRound size={20} className="shrink-0" />
                <span>อื่นๆ</span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/katudnakJ?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repositories"
                >
                  <FaGithub
                    size={32}
                    className="cursor-pointer text-[#22251A]"
                  />
                </a>

                <a
                  href="https://github.com/Jidapa-Kratudnak"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <FaGithub
                    size={32}
                    className="cursor-pointer text-[#7b02d7]"
                  />
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card
          className="!w-full !rounded-[40px] !shadow-lg sm:!rounded-[50px]"
          styles={{
            body: {
              padding: "20px",
            },
          }}
        >
          <div className="text-base leading-7 sm:text-lg sm:leading-8 md:p-4 lg:text-[22px]">
            <p className="indent-8">
              {aboutMeData.THaboutMe}
            </p>

            <Divider className="!mx-auto !my-6 !w-[80%] !border-t-[2px]" />

            <p className="leading-7 sm:leading-8">
              {aboutMeData.ENaboutMe}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AboutMeSection;