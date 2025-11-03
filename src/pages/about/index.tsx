import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import AboutHero from "@/ui/about/hero";
import Process from "@/ui/about/process";
import Story from "@/ui/about/story";
import Visit from "@/ui/about/visit";
import Entrance from "@/animated/Entrance";

const AboutPage = () => {
  return (
    <Entrance>
      <Navbar active={1} />
      <div className="w-full max-w-[1536px] mx-auto">
      <AboutHero />
      <Story />
      <Process />
      <Visit />
      </div>
      <Footer />
    </Entrance>
  );
};

export default AboutPage;
