"use client";

import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import { ProjectExpDataType } from "../types/projectExpDataType";
import Image from "next/image";

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
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
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
              className={`
                overflow-hidden!
                rounded-4xl!
                border-0!
                shadow-xl!
                sm:rounded-[40px]!
                ${
                  descriptionExpanded ||
                  technologiesExpanded ||
                  languageExpanded
                    ? "lg:min-h-150!"
                    : "lg:h-150!"
                }
              `}
              styles={{
                body: {
                  height: "100%",
                  padding: 0,
                },
              }}
            >
              <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                <div className="flex min-h-70 items-center justify-center bg-slate-100 p-6 sm:min-h-87.5 lg:h-full ">
                  <div className="flex h-full w-full items-center justify-center">
                    {project.imageURL ? (
                      <Image
                        src={project.imageURL}
                        alt={project.ENprojectName}
                        width={400}
                        height={400}
                        className="overflow-hidden rounded-tl-[30px] rounded-tr-[30px] sm:rounded-tl-[40px] sm:rounded-tr-[40px] lg:rounded-bl-[40px] lg:rounded-tr-none"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-tl-[30px] sm:rounded-tl-[40px] lg:rounded-bl-[40px]">
                        <span className="text-slate-500">
                          No Image Available
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-h-0 flex-col p-6 sm:p-8 md:p-10">
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
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
                      className={`
                        text-base
                        leading-7
                        text-slate-600
                        sm:text-lg
                        ${descriptionExpanded ? "" : "line-clamp-3"}
                      `}
                    >
                      {project.description.map((desc, index) => (
                        <span key={index}>
                          • {desc}
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
                        className="mt-2 text-sm font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-800"
                      >
                        {descriptionExpanded ? "ย่อ" : "เพิ่มเติม"}
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 pt-2 font-medium">
                        Technologies:
                      </span>

                      <div
                        ref={(element) => {
                          technologiesRefs.current[
                            `${projectKey}-technologies`
                          ] = element;
                        }}
                        className={`
                          flex
                          flex-1
                          flex-wrap
                          gap-2
                          overflow-hidden
                          ${technologiesExpanded ? "" : "max-h-20"}
                        `}
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
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-800"
                        >
                          {technologiesExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 pt-2 font-medium">
                        Language:
                      </span>

                      <div
                        ref={(element) => {
                          languageRefs.current[`${projectKey}-language`] =
                            element;
                        }}
                        className={`
                          flex
                          flex-1
                          flex-wrap
                          gap-2
                          overflow-hidden
                          ${languageExpanded ? "" : "max-h-20"}
                        `}
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
                          className="text-sm font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-800"
                        >
                          {languageExpanded ? "ย่อ" : "เพิ่มเติม"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end pt-6">
                    <button
                      type="button"
                      disabled
                      className="w-fit shrink-0 rounded-full! bg-[#6c5846] px-6 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      ตรวจสอบ Project
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ProjectExpCard;
