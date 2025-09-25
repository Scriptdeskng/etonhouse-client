import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Orders from "@/ui/profile/orders";
import Layout from "@/utils/layout";

const Order = () => {
  return (
    <Protected>
        <Navbar />
        <Layout>
        <Orders />
        </Layout>
        <Footer />
    </Protected>
  );
};

export default Order;
