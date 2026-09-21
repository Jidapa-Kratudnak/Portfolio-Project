import Footer from "@/components/footer";
import Header from "@/components/header";
import AboutMeSection from "@/modules/aboutMe/components/aboutMe";
import Welcome from "@/modules/welcome/welcome";
import { Divider } from "antd";
export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 md:p-30">
        <div>
          <Welcome />
        </div>
            <Divider className="mx-auto my-6 w-[80%] border-t-3! border-[#22231A]/90" />
      <AboutMeSection />
      </main>
      <Footer />
    </>
  );
}
