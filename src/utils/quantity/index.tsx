import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  size?: "sm" | "lg";
}

const Quantity = ({ count, setCount, size = "lg" }: Props) => {
  return (
    <div
      className={`flex items-center justify-between text-[#9E9E9E] border border-[#A3A3A3] ${
        size === "lg" && "w-[95px] h-8 sm:w-[160px] sm:h-12 px-3"
      } ${size === "sm" && "h-5 w-14 sm:h-8 sm:w-20 px-1"}`}
    >
      <button
        className={`${count === 1 ? "cursor-default" : "cursor-pointer"}`}
        onClick={() => setCount((prev) => prev - 1)}
        disabled={count === 1}
      >
        <FaAngleLeft
          className={`${size === "lg" && "w-3 h-3 sm:w-4.5 sm:h-4.5"} ${
            size === "sm" && "w-1.5 h-1.5 sm:w-3 sm:h-3"
          }`}
        />
      </button>

      <p
        className={`${size === "lg" && "text-[10px] sm:text-lg"} ${
          size === "sm" && "text-[8px] sm:text-xs"
        } leading-[100%] text-[#8D8D8D]`}
      >
        {count}
      </p>

      <button
        className="cursor-pointer"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <FaAngleRight
          className={`${size === "lg" && "w-3 h-3 sm:w-4.5 sm:h-4.5"} ${
            size === "sm" && "w-1.5 h-1.5 sm:w-3 sm:h-3"
          }`}
        />
      </button>
    </div>
  );
};

export default Quantity;
