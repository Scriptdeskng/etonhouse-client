import Breadcrumbs from "@/utils/breadcrumbs";
import Sidebar from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-[50px] px-[120px] py-[34px]">
      <Breadcrumbs
        history={[{ name: "Home", path: "/" }, { name: "Account" }]}
      />

      <div className="w-full grid grid-cols-[160px_1fr] gap-[140px] min-h-[60vh]">
        <Sidebar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
