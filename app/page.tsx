import Footer from "@/components/footer";
import Header from "@/components/header";
import AboutMeSection from "@/modules/aboutMe/components/aboutMeSection";
import Welcome from "@/modules/welcome/welcome";
import { Divider } from "antd";
import { aboutMeData } from "@/modules/aboutMe/data/aboutMeData";
import EducationsSection from "@/modules/educations/components/educationsSection";
import { educationData } from "@/modules/educations/data/educationsData";
import ProjectExpSection from "@/modules/projectExp/components/projectExpSection";
import { ProjectExpData } from "@/modules/projectExp/data/projectExpData";
import ActivitiesSection from "@/modules/activities/components/activitiesSection";
import Skills from "@/modules/skills/components/skillsSection";
import { activitiesData } from "@/modules/activities/data/activitiesDataSection";
import { skillsData } from "@/modules/skills/data/skillsData";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <Welcome />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
          <AboutMeSection aboutMeData={aboutMeData} />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
          <EducationsSection educationData={educationData} />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
          <ProjectExpSection projectExpData={ProjectExpData} />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
          <ActivitiesSection activitiesData={activitiesData} />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
          <Skills skillsData={skillsData} />
        </div>
      </main>

      <Footer />
    </>
  );
}
