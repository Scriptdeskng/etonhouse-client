import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Home from "@/ui/profile/home";
import Layout from "@/utils/layout";

const Profile = () => {
  return (
    <Protected>
        <Navbar />
        <Layout>
        <Home />
        </Layout>
        <Footer />
    </Protected>
  );
};

export default Profile;
