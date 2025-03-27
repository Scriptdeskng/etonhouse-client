import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import GalleryHero from "@/ui/gallery/hero";

const Gallery = () => {
  return (
    <div>
      <Navbar active={3} />
      <GalleryHero />
      <Footer />
    </div>
  );
};

export default Gallery;
