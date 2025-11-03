import Category from "@/components/category";
import ColorScheme from "@/components/color-scheme";
import Range from "@/components/range";
import Image from "next/image";

const RegistrySidebar = ({
  handleParams,
  handleClear,
}: {
  handleParams: (name: string, value: any) => void;
  handleClear: () => void;
}) => {
  return (
    <div className="hidden lg:flex lg:flex-col w-full">
      <div className="w-full px-5 xl:pl-10 xl:pr-6 py-12.5 border-y border-[#141414CC]">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src="/assets/svg/filter.svg"
              alt="filter"
              width={24}
              height={24}
            />
            <p className="text-lg font-medium text-black">Filter</p>
          </button>
          
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <section className="p-5 py-8 xl:p-10">
        <Category handleParams={handleParams} />
        <Range handleParams={handleParams} />
        {/* <ColorScheme /> */}
      </section>
    </div>
  );
};

export default RegistrySidebar;