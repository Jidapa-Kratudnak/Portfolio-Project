import Footer from "@/components/footer";
import Header from "@/components/header";
import ProjectExpDetails from "@/modules/projectExp/components/projectExpDetail";
import {ProjectExpData} from "@/modules/projectExp/data/projectExpData";

const ProjectDetail = () => {
  return (
    <>
    <Header />
    <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
            <ProjectExpDetails {...ProjectExpData[0]} />
        </div>
    </main>
    <Footer />
    </>
  );
};

export default ProjectDetail;