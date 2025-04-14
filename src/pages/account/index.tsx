import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Login from "@/ui/account/login";
import Register from "@/ui/account/register";
import Breadcrumbs from "@/utils/breadcrumbs";

const Account = () => {
  return (
    <Entrance>
      <Navbar active={10} />
      <div className="px-5 xl:px-20 lg:py-8 space-y-[50px]">
        <Breadcrumbs
          history={[{ name: "Home", path: "/" }, { name: "Account" }]}
        />

        <div className="w-full grid gap-8 lg:grid-cols-2 xl:gap-10 pb-12 xl:pb-24">
          <Login />
          <Register />
        </div>
      </div>
      <Footer />
    </Entrance>
  );
};

export default Account;
