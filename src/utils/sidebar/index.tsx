import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ active = "Dashboard" }: { active?: string }) => {
  const { logoutUser } = useAuthStore();
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Orders", path: "/dashboard" },
    { name: "Saved items", path: "/dashboard" },
    { name: "Payment methods", path: "/dashboard" },
    { name: "Addresses", path: "/dashboard" },
    { name: "Profile settings", path: "/dashboard" },
  ];

  function handleLogout() {
    router.push("/");
    logoutUser();
  }

  return (
    <div className="space-y-[30px]">
      <p className="text-xl font-bold text-[#333333]">MY ACCOUNT</p>

      <div className="flex flex-col gap-5">
        {links.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={clsx(
              "text-lg text-[#616161]",
              active === item.name && "font-medium text-[#414205]"
            )}
          >
            {item.name}
          </Link>
        ))}

        <div
          role="button"
          className="text-lg text-[#616161] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
