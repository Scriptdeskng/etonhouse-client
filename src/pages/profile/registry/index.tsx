import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import MyRegistries from "@/ui/profile/registry";
import Layout from "@/utils/layout";

const Dashboard = () => {
  return (
    <Protected>
        <Navbar />
        <Layout>
        <MyRegistries />
        </Layout>
        <Footer />
    </Protected>
  );
};

export default Dashboard;