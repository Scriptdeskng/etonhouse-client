import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Favorites from "@/ui/profile/favourites";
import Layout from "@/utils/layout";

const Favorite = () => {
  return (
    <Protected>
        <Navbar />
        <Layout>
        <Favorites />
        </Layout>
        <Footer />
    </Protected>
  );
};

export default Favorite;
