import Category from "@/components/category";
import ColorScheme from "@/components/color-scheme";
import Range from "@/components/range";
import Image from "next/image";

const ShopSidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col w-full">
      <div className="w-full px-5 xl:pl-10 xl:pr-6 py-12.5 border-y border-[#141414CC]">
        <button className="w-full flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/assets/svg/filter.svg"
            alt="filter"
            width={24}
            height={24}
          />

          <p className="text-lg font-medium text-black">Filter</p>
        </button>
      </div>

      <section className="p-5 py-8 xl:p-10">
        <Category />

        <Range />

        <ColorScheme />
      </section>
    </div>
  );
};

export default ShopSidebar;
