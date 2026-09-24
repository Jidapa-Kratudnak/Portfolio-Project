import { GiCycle } from "react-icons/gi";
import { skillsDataType } from "../types/skillsDataType";
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaFigma,FaRegLightbulb} from "react-icons/fa";

import { MdLanguage, MdGroups, MdStorage, MdDesignServices, MdSwapHoriz } from "react-icons/md";
import { RiShakeHandsLine } from "react-icons/ri";
import { SiJavascript, SiMiro, SiMysql, SiPostgresql } from "react-icons/si";

export const skillsData: skillsDataType[] = [
  {
    id: 1,
    skillType: "Programming Languages",
    skills: [
      {
        id: 1,
        skillName: "Java",
        skillImage: FaJava,
      },
      {
        id: 2,
        skillName: "JavaScript",
        skillImage: SiJavascript,
      },
      {
        id: 3,
        skillName: "SQL",
        skillImage: MdLanguage,
      },
    ],
  },

  {
    id: 2,
    skillType: "Web Development",
    skills: [
      {
        id: 1,
        skillName: "HTML",
        skillImage: FaHtml5,
      },
      {
        id: 2,
        skillName: "CSS",
        skillImage: FaCss3Alt,
      },
      {
        id: 3,
        skillName: "React",
        skillImage: FaReact,
      },
    ],
  },

  {
  id: 3,
  skillType: "UX/UI Design",
  skills: [
    {
      id: 1,
      skillName: "Figma",
      skillImage: FaFigma,
    },
    {
      id: 2,
      skillName: "Miro",
      skillImage: SiMiro,
    },
    {
      id: 3,
      skillName: "Canva",
      skillImage: MdDesignServices,
    },
  ],
},
{
  id: 4,
  skillType: "Database Management",
  skills: [
    {
      id: 1,
      skillName: "MySQL",
      skillImage: SiMysql,
    },
    {
      id: 2,
      skillName: "PostgreSQL",
      skillImage: SiPostgresql,
    },
    {
      id: 3,
      skillName: "Oracle",
      skillImage: MdStorage,
    },
  ],
},

  {
    id: 5,
    skillType: "Languages",
    skills: [
      {
        id: 1,
        skillName: "Thai (Native)",
        skillImage: MdLanguage,
      },
      {
        id: 2,
        skillName: "English (B1 — STEP G&E Center)",
        skillImage: MdLanguage,
      },
    ],
  },

  {
    id: 6,
    skillType: "Soft Skills",
    skills: [
      {
        id: 1,
        skillName: "Teamwork",
        skillImage: RiShakeHandsLine,
      },
      {
        id: 2,
        skillName: "Adaptability",
        skillImage: GiCycle,
      },
      {
        id: 3,
        skillName: "Flexibility",
        skillImage: MdSwapHoriz,
      },
      {
        id: 4,
        skillName: "Creativity",
        skillImage: FaRegLightbulb,
      },
      {
        id: 5,
        skillName: "Team Support",
        skillImage: MdGroups,
      },
    ],
  },
];

