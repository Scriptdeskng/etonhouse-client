import useAuthStore from "@/store/authStore";
import Layout from "@/utils/layout";
import { useRouter } from "next/router";

const Home = () => {
  const { user, logoutUser } = useAuthStore();
  const router = useRouter();

  function handleLogout() {
    router.push("/");
    logoutUser();
  }

  return (
    <Layout>
      <div className="space-y-[18px] mt-10">
        <p className="text-lg text-black">
          Hello {user?.username} (not {user?.username}?{" "}
          <span
            role="button"
            className="text-[#8D8F08] cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </span>
          )
        </p>

        <p className="w-full max-w-[825px] text-lg text-[#616161]">
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
