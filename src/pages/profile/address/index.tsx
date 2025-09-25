import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Addresses from "@/ui/profile/address";
import Layout from "@/utils/layout"

const Favorite = () => {
  return (
    <Protected>
        <Navbar />
        <Layout>
        <Addresses />
        </Layout>
        <Footer />
    </Protected>
  );
};

export default Favorite;
