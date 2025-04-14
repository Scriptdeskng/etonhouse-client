import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import GalleryHero from "@/ui/gallery/hero";

const Gallery = () => {
  return (
    <Entrance>
      <Navbar active={3} />
      <GalleryHero />
      <Footer />
    </Entrance>
  );
};

export default Gallery;
