import { useState } from "react";
import Breadcrumbs from "@/utils/breadcrumbs";
import Sidebar from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="space-y-[30px] py-[34px] px-5 sm:px-10 lg:px-20 max-w-[1536px] mx-auto">
      <Breadcrumbs
        history={[{ name: "Home", path: "/" }, { name: "Account" }]}
      />

      <div className="hidden sm:grid w-full grid-cols-[200px_1fr] gap-10 min-h-[60vh]">
        <Sidebar />
        {children}
      </div>

      <div className="sm:hidden min-h-[60vh]">
        {!showContent ? (
          <Sidebar onSelect={() => setShowContent(true)} />
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShowContent(false)}
              className="text-sm text-black-100 font-medium"
            >
              ← Back to Profile
            </button>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
