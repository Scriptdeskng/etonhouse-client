import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps {
  onSelect?: () => void;
}

const Sidebar = ({ onSelect }: SidebarProps) => {
  const { logoutUser } = useAuthStore();
  const router = useRouter();

  const links = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/profile/orders" },
    { name: "My Gift Registry", path: "/profile/registry" },
    { name: "Favorites", path: "/profile/favorites" },
    { name: "Addresses", path: "/profile/address" },
  ];

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  function handleLogout() {
    router.push("/");
    logoutUser();
  }

  return (
    <div className="space-y-[30px]">
      <p className="text-xl font-bold text-[#333333]">MY ACCOUNT</p>

      <div className="flex flex-col gap-3">
        {links.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            onClick={onSelect}
            className={clsx(
              "text-lg transition-colors duration-200 rounded-md p-2",
              "border border-gray-200 sm:border-none",
              isActive(item.path)
                ? "font-semibold text-[#414205] bg-[#414205]/5 sm:bg-transparent"
                : "text-[#616161] hover:text-[#414205] hover:bg-gray-50 sm:hover:bg-transparent"
            )}
          >
            {item.name}
          </Link>
        ))}

        <div
          role="button"
          className="text-lg text-[#616161] cursor-pointer hover:text-red-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50 sm:hover:bg-transparent"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;