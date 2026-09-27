"use client";

import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ProjectExpDataType } from "../types/projectExpDataType";
import ImagesCarousel from "@/components/imagesCarousel";
import { TriangleAlert } from "lucide-react";

interface ProjectExpCardProps {
  projectExpData: ProjectExpDataType[];
}

const ProjectExpCard = ({ projectExpData }: ProjectExpCardProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [hasOverflow, setHasOverflow] = useState<Record<string, boolean>>({});

  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>(
    {},
  );

  const technologiesRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const languageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkOverflow = () => {
      const result: Record<string, boolean> = {};

      projectExpData.forEach((project) => {
        const projectKey = `${project.ENprojectName}-${project.THprojectName}`;

        const description =
          descriptionRefs.current[`${projectKey}-description`];

        const technologies =
          technologiesRefs.current[`${projectKey}-technologies`];

        const language = languageRefs.current[`${projectKey}-language`];

        if (description) {
          result[`${projectKey}-description`] =
            description.scrollHeight > description.clientHeight;
        }

        if (technologies) {
          result[`${projectKey}-technologies`] =
            technologies.scrollHeight > technologies.clientHeight;
        }

        if (language) {
          result[`${projectKey}-language`] =
            language.scrollHeight > language.clientHeight;
        }
      });

      setHasOverflow(result);
    };

    const timer = setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [projectExpData]);

  const toggleExpand = (key: string) => {
    setExpanded((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <div>
      {projectExpData.map((project) => {
        const projectKey = `${project.ENprojectName}-${project.THprojectName}`;

        const descriptionExpanded =
          expanded[`${projectKey}-description`] ?? false;

        const technologiesExpanded =
          expanded[`${projectKey}-technologies`] ?? false;

        const languageExpanded = expanded[`${projectKey}-language`] ?? false;

        const descriptionOverflow =
          hasOverflow[`${projectKey}-description`] ?? false;

        const technologiesOverflow =
          hasOverflow[`${projectKey}-technologies`] ?? false;

        const languageOverflow = hasOverflow[`${projectKey}-language`] ?? false;

        return (
          <div key={projectKey} className="mb-10">
            <Card
              className="overflow-hidden! rounded-[40px]! border-0! shadow-xl! transition-shadow duration-300 hover:shadow-2xl! sm:rounded-[50px]!"
              styles={{
                body: {
                  height: "100%",
                  padding: 0,
                },
              }}
            >
              <div className="grid grid-cols-1">
                <ImagesCarousel images={project.images ?? []} />

                <div className="flex min-h-0 flex-col p-6 sm:p-8 md:p-10 xl:p-10">
                  <span className="text-sm font-medium uppercase tracking-widest text-slate-500">
                    {project.ENprojectName}
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                    {project.THprojectName}
                  </h2>

                  <div className="mt-4">
                    <p
                      ref={(element) => {
                        descriptionRefs.current[`${projectKey}-description`] =
                          element;
                      }}
                      className={`text-base leading-7 text-slate-600 sm:text-lg ${
                        descriptionExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {project.description.map((description, index) => (
                        <span key={index}>
                          • {description}
                          <br />
                        </span>
                      ))}
                    </p>

                    {descriptionOverflow && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleExpand(`${projectKey}-description`)
                        }
                        className="mt-2 text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-800"
                      >
                        {descriptionExpanded ? "ย่อ" : "เพิ่มเติม"}
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <span className="shrink-0 font-medium sm:pt-2">
                        เทคโนโลยีที่ใช้:
                      </span>

                      <div
                        ref={(element) => {
                          technologiesRefs.current[
                            `${projectKey}-technologies`
                          ] = element;
                        }}
                        className={`flex min-w-0 flex-1 flex-wrap gap-2 overflow-hidden ${
                          technologiesExpanded ? "" : "max-h-20"
                        }`}
                      >
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    {technologiesOverflow && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            toggleExpand(`${projectKey}-technologies`)
                          }
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-800"
                        >
                          {technologiesExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <span className="shrink-0 font-medium sm:pt-2">
                        ภาษาที่ใช้:
                      </span>

                      <div
                        ref={(element) => {
                          languageRefs.current[`${projectKey}-language`] =
                            element;
                        }}
                        className={`flex min-w-0 flex-1 flex-wrap gap-2 overflow-hidden ${
                          languageExpanded ? "" : "max-h-20"
                        }`}
                      >
                        {project.language.map((language) => (
                          <span
                            key={language}
                            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    {languageOverflow && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => toggleExpand(`${projectKey}-language`)}
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-800"
                        >
                          {languageExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end pt-2">
                    {/* <button
                      type="button"
                      disabled
                      className="w-fit shrink-0 rounded-full! bg-[#6c5846] px-6 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      ตรวจสอบ Project
                    </button> */}
                    <button
                      type="button"
                      disabled
                      className="w-fit shrink-0 cursor-not-allowed rounded-full! bg-[#6d5a49dc] px-6 py-3 text-sm font-medium text-white"
                    >
                      <p className="flex items-center gap-2">
                      <TriangleAlert 
                      className="transition duration-200 animate-pulse"
                      /> Demo ยังไม่พร้อมใช้งานเนื่องจากข้อจำกัดการใช้งาน
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectExpCard;
