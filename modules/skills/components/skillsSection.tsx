import { skillsDataType } from "../types/skillsDataType";
import SkillsCard from "./skillsCard";

type skillsDataProp = {
  skillsData: skillsDataType[];
};

const SkillsSection = ({ skillsData }: skillsDataProp) => {
  return (
    <>
      <section className="w-full bg-linear-to-b  px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#3b302675] sm:text-base">
            Skills and Abilities
          </span>
          <h1 className="text-3xl font-bold text-[#3b3026] sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl xl:text-[65px]">
            ทักษะความสามารถ
          </h1>
          <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-[#8b6c52] to-[#604d3b] sm:w-28" />
        </div>
        <div className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
          <SkillsCard skillsData={skillsData} />
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
