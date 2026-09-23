import { ProjectExpDataType } from "../types/projectExpDataType";

const ProjectExpDetails = (projectExpData: ProjectExpDataType) => {


    return (
        <>
            <div className="flex flex-col items-center text-center">
                <span className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-base">
                    Project experience
                </span>
                <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl xl:text-[65px]">
                 {projectExpData.THprojectName}
                </h1>
                <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#8b6c52] to-[#604d3b] sm:w-28" />
            </div>
        </>
    );
}

export default ProjectExpDetails;