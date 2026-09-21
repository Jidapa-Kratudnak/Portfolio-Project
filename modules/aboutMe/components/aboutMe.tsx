import { aboutMeData } from "@/modules/aboutMe/data/aboutMeData";
import { Card } from "antd";
import { Divider } from "antd";
import { ContactRound, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutMeSection = () => {
  const aboutMe = aboutMeData;

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[69px] font-bold mb-4 mt-20">About Me</h1>
      </div>

      <div className="flex flex-col items-center text-center p-10">
        <Card className="justify-center items-center content-center rounded-[55px]! bg-[#F5F5DC] shadow-lg h-100%">
          <div className="flex h-100% items-center justify-center">
            <Image
              src={aboutMe.profileImage}
              alt="Jidapa Katudnak"
              width={300}
              height={300}
              className="rounded-[50px]"
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        <Card
          className="rounded-[40px]! shadow-lg sm:rounded-[50px]! md:col-span-1"
          styles={{
            body: {
              padding: "28px",
            },
          }}
        >
          <div className="grid grid-cols-[minmax(120px,150px)_1fr] gap-x-4 gap-y-6 p-5 text-base sm:text-lg lg:text-[20px]">
            <p className="flex items-center gap-2 font-medium">
              <UserRound size={20} className="shrink-0" />
              <span>ชื่อ-นามสกุล</span>
            </p>

            <p className="wrap-break-word">
              {aboutMe.THfirstName} {aboutMe.THlastName}
            </p>

            <p className="flex items-center gap-2 font-medium">
              <Phone size={20} className="shrink-0" />
              <span>เบอร์โทรศัพท์</span>
            </p>

            <p className="wrap-break-word">{aboutMe.phone}</p>

            <p className="flex items-center gap-2 font-medium">
              <Mail size={20} className="shrink-0" />
              <span>E-mail</span>
            </p>

            <p className="break-all">{aboutMe.email}</p>

            <p className="flex items-center gap-2 font-medium">
              <MapPin size={20} className="shrink-0" />
              <span>ที่อยู่</span>
            </p>

            <p className="wrap-break-word">{aboutMe.address}</p>
          </div>

          <Divider className="mx-auto my-6 w-[80%]! border-t-[2px]! border-[#22231A]/20" />

          <div className="grid grid-cols-[minmax(120px,150px)_1fr] gap-x-4 p-5 text-base sm:text-lg lg:text-[20px]">
            <p className="flex items-center gap-2 font-medium">
              <ContactRound size={20} className="shrink-0" />
              <span>อื่นๆ</span>
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
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
          </div>
        </Card>

        <Card
          className="rounded-[40px]! shadow-lg! sm:rounded-[50px]! md:col-span-2"
          styles={{
            body: {
              padding: "28px",
            },
          }}
        >
          <div className="text-base leading-8 sm:text-lg lg:p-4 lg:text-[22px]">
            <p className="indent-8">{aboutMe.THaboutMe}</p>

            <Divider className="mx-auto my-6 w-[80%]! border-t-[2px]!" />

            <p className="leading-8">{aboutMe.ENaboutMe}</p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AboutMeSection;
