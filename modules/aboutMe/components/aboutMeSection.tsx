import { Card, Divider } from "antd";
import { ContactRound, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { AboutMeDataType } from "../types/aboutMeDataType";

type AboutMeProps = {
  aboutMeData: AboutMeDataType;
};

const AboutMeSection = ({ aboutMeData }: AboutMeProps) => {
  return (
    <>
      <section className="w-full bg-linear-to-b  px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#3b302675] sm:text-base">
            About Me
          </span>
          <h1 className="text-3xl font-bold text-[#3b3026] sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl xl:text-[65px]">
            เกี่ยวกับฉัน
          </h1>
          <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-[#8b6c52] to-[#604d3b] sm:w-28" />
        </div>
        
        <div className="mx-auto mt-10 w-full sm:mt-14 items-center justify-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:px-10 lg:gap-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              <div className="flex justify-center">
                <Card
                  className="w-full! max-w-100! rounded-[40px]! shadow-lg! sm:rounded-[50px]! md:rounded-[55px]!"
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
                      className="h-auto w-full max-w-75 rounded-[40px] sm:rounded-[50px]"
                    />
                  </div>
                </Card>
              </div>

              <Card
                className="flex! w-full! items-center! justify-center! rounded-[40px]! shadow-lg! sm:rounded-[50px]!"
                styles={{
                  body: {
                    padding: "20px",
                  },
                }}
              >
                <div className="space-y-5 p-2">
                  <div className="flex items-start gap-3">
                    <UserRound size={21} className="mt-1 shrink-0" />

                    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="shrink-0 sm:w-27.5 sm:font-medium md:w-32.5 lg:text-[20px]">
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
                      <span className="shrink-0 sm:w-27.5 sm:font-medium md:w-32.5 lg:text-[20px]">
                        เบอร์โทรศัพท์
                      </span>

                      <span className="wrap-break-word *:sm:font-medium lg:text-[20px]">
                        {aboutMeData.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={21} className="mt-1 shrink-0" />

                    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="shrink-0 sm:w-27.5 sm:font-medium md:w-32.5 lg:text-[20px]">
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
                      <span className="shrink-0 *:sm:font-medium sm:w-27.5 md:w-32.5 lg:text-[20px]">
                        ที่อยู่
                      </span>

                      <span className="wrap-break-word *:sm:font-medium lg:text-[20px]">
                        {aboutMeData.address}
                      </span>
                    </div>
                  </div>
                </div>

                <Divider className="mx-auto! my-6! w-[80%]! border-t-2! border-[#22231A]/20!" />

                <div className="flex flex-wrap items-center gap-4 p-2 text-base sm:p-5 sm:text-lg lg:text-[20px]">
                  <p className="flex items-center gap-2 sm:font-medium lg:text-[20px]">
                    <ContactRound size={20} className="shrink-0" />
                    <span>ช่องทางอื่นๆ</span>
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
              className=" rounded-[40px]! shadow-lg!overflow-hidden! border-0! shadow-xl! transition-shadow duration-300 hover:shadow-2xl! sm:rounded-[40px]!"
              styles={{
                body: {
                  padding: 0,
                },
              }}
            >
              <div className="text-base leading-7 sm:text-lg sm:leading-8 md:p-4 lg:text-[22px] m-10">
                <p className="indent-8">{aboutMeData.THaboutMe}</p>

               
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMeSection;
