import Footer from "@/components/footer";
import Header from "@/components/header";
import AboutMeSection from "@/modules/aboutMe/components/aboutMe";
import Welcome from "@/modules/welcome/welcome";
import { Divider } from "antd";
import { aboutMeData } from "@/modules/aboutMe/data/aboutMeData";
import Educations from "@/modules/educations/components/educations";
import { educationData } from "@/modules/educations/data/educationsData";

export default function Home() {

  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          <Welcome />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />

          <AboutMeSection {...aboutMeData} />

          <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />

          <Educations {...educationData} />
        </div>
      </main>

      <Footer />
    </>
  );
}
