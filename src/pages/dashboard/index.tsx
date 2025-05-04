import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import Home from "@/ui/dashboard/home";

const Dashboard = () => {
  return (
    <Protected>
      <Entrance>
        <Navbar active={10} />
        <Home />
        <Footer />
      </Entrance>
    </Protected>
  );
};

export default Dashboard;
