import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";
import Showroom from "@/components/showroom";
import Testimonials from "@/components/testimonials";
import Banner from "@/ui/home/banner";
import BestSellers from "@/ui/home/best-sellers";
import FeaturedCollections from "@/ui/home/featured-collection";
import Hero from "@/ui/home/hero";
import NewArrivals from "@/ui/home/new-arrivals";

const Home = () => {
  return (
    <Entrance>
      <Navbar />
      <Banner />
      <Hero />
      <BestSellers />
      <FeaturedCollections />
      <NewArrivals />
      <Showroom />
      <Testimonials />
      <Newsletter />
      <Footer />
    </Entrance>
  );
};

export default Home;
