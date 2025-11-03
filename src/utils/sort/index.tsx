import { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";

const sortOptions = [
  { label: "Newest", value: "-created_at" },
  { label: "Oldest", value: "created_at" },
  // { label: "Popular", value: "-popularity" },
  // { label: "Price: Low to High", value: "current_price" },
  // { label: "Price: High to Low", value: "-current_price" },
  // { label: "Name: A to Z", value: "name" },
  // { label: "Name: Z to A", value: "-name" },
];

const Sort = ({
  handleParams,
  currentSort,
}: {
  handleParams: (name: string, value: any) => void;
  currentSort?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === currentSort) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    handleParams("ordering", value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <p className="text-sm md:text-lg text-[#616161]">Sort by:</p>
        <p className="text-sm md:text-lg font-medium text-black">{selectedOption.label}</p>
        <FaCaretDown
          className={`w-3.5 h-3.5 md:w-6 md:h-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                option.value === currentSort ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;