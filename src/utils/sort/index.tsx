import { FaCaretDown } from "react-icons/fa6";

const Sort = () => {
  return (
    <button className="flex items-center gap-2.5 cursor-pointer">
      <p className="text-sm md:text-lg text-[#616161]">Sort by:</p>
      <p className="text-sm md:text-lg font-medium text-black">Newest</p>
      <FaCaretDown className="w-3.5 h-3.5 md:w-6 md:h-6"/>
    </button>
  );
};

export default Sort;
