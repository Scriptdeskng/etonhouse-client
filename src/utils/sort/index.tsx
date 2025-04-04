import { FaCaretDown } from "react-icons/fa6";

const Sort = () => {
  return (
    <button className="flex items-center gap-2.5 cursor-pointer">
      <p className="text-lg text-[#616161]">Sort by:</p>
      <p className="text-lg font-medium text-black">Newest</p>
      <FaCaretDown size={24} />
    </button>
  );
};

export default Sort;
