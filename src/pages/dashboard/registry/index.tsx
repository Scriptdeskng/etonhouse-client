import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import MyRegistries from "@/ui/dashboard/registry";
import Layout from "@/utils/layout";

const Dashboard = () => {
  return (
    <Protected>
      <Entrance>
        <Navbar active={10} />
        <Layout>
        <MyRegistries />
        </Layout>
        <Footer />
      </Entrance>
    </Protected>
  );
};

export default Dashboard;