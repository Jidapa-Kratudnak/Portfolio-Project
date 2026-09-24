import type { IconType } from "react-icons";

type skillsType = {
    id: number;
    skillName: string;
    skillImage: IconType;
}

export type skillsDataType = {
    id: number;
    skillType: string;
    skills: skillsType[];
}