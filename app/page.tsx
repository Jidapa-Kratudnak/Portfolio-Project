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
import { activitiesData } from "@/modules/activities/data/activitiesData";
import { skillsData } from "@/modules/skills/data/skillsData";
import SkillsSection from "@/modules/skills/components/skillsSection";
import { experienceData } from "@/modules/experience/data/experienceData";
import ExperienceSection from "@/modules/experience/components/experienceSection";
import HeaderAnchor from "@/components/headerAnchor";

export default function Home() {
  return (
    <>

    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
  <HeaderAnchor />
</div>
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">

          <section id="welcome">
            <Welcome />
          </section>

          <section id="about">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <AboutMeSection aboutMeData={aboutMeData} />
          </section>

          <section id="education">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <EducationsSection educationData={educationData} />
          </section>

          <section id="projects">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <ProjectExpSection projectExpData={ProjectExpData} />
          </section>
          
          <section id="activities">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <ActivitiesSection activitiesData={activitiesData} />
          </section>

          <section id="skills">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <SkillsSection skillsData={skillsData} />
          </section>

          <section id="experience">
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
            <ExperienceSection experienceData={experienceData} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
