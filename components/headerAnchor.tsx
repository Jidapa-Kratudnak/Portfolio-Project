"use client";

import { Anchor } from "antd";

type HeaderAnchorProps = {
  mobile?: boolean;
};

const HeaderAnchor = ({ mobile = false }: HeaderAnchorProps) => {
  const textColor = mobile
    ? "text-white! hover:text-[#f1ebe4]!"
    : "text-[#6c5846]! hover:text-[#4f4032]!";

  return (
    <Anchor
      affix={false}
      className={`header-anchor ${
        mobile ? "header-anchor-mobile" : ""
      }`}
      items={[
        {
          key: "welcome",
          href: "#welcome",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              ยินดีต้อนรับ
            </span>
          ),
        },
        {
          key: "about",
          href: "#about",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              เกี่ยวกับฉัน
            </span>
          ),
        },
        {
          key: "education",
          href: "#education",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              ประวัติการศึกษา
            </span>
          ),
        },
        {
          key: "projects",
          href: "#projects",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              ประสบการณ์การทำโครงงาน
            </span>
          ),
        },
        {
          key: "activities",
          href: "#activities",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              กิจกรรมและการอบรม
            </span>
          ),
        },
        {
          key: "skills",
          href: "#skills",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              ทักษะความสามารถ
            </span>
          ),
        },
        {
          key: "experience",
          href: "#experience",
          title: (
            <span
              className={`text-base font-medium! transition-colors duration-200 ${textColor}`}
            >
              ประสบการณ์การฝึกสหกิจศึกษา
            </span>
          ),
        },
      ]}
    />
  );
};

export default HeaderAnchor;