import { Card } from "antd";
import { skillsDataType } from "../types/skillsDataType";

type SkillsCardProps = {
  skillsData: skillsDataType[];
};

const SkillsCard = ({ skillsData }: SkillsCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skillsData.map((skillGroup) => {
        const isLanguages = skillGroup.skillType === "Languages";

        return (
          <Card
            key={skillGroup.id}
            className="overflow-hidden! rounded-4xl! border-0! shadow-xl! transition-shadow duration-300 hover:shadow-2xl! sm:rounded-[40px]!"
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <div className="flex min-h-70 flex-col p-6 sm:p-8 lg:p-10">
              <h2 className="mb-6 text-center text-xl font-bold text-slate-800 sm:text-2xl">
                {skillGroup.skillType}
              </h2>

              {isLanguages ? (
                <div className="flex flex-col gap-4">
                  {skillGroup.skills.map((skill) => {
                    const Icon = skill.skillImage;

                    return (
                      <div
                        key={skill.id}
                        className="flex items-center gap-4 rounded-full p-4 transition-transform duration-200 hover:-translate-y-1"
                      >
                        <Icon
                          size={30}
                          className="shrink-0 text-[#22251A]"
                        />

                        <span className="text-base font-medium text-slate-700">
                          {skill.skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5">
                  {skillGroup.skills.map((skill) => {
                    const Icon = skill.skillImage;

                    return (
                      <div
                        key={skill.id}
                        className="flex flex-col items-center justify-center gap-3 p-4 text-center transition-transform duration-200 hover:-translate-y-1 rounded-full"
                      >
                        <Icon
                          size={30}
                          className="shrink-0 text-[#22251A]"
                        />

                        <span className="text-sm font-medium text-slate-700 sm:text-base">
                          {skill.skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SkillsCard;