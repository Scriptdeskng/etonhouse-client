import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Quantity = ({ count, setCount }: Props) => {
  return (
    <div className="w-[160px] h-14 flex items-center justify-between text-[#9E9E9E] border border-[#A3A3A3] px-3">
      <button
        className={`${count === 1 ? "cursor-default" : "cursor-pointer"}`}
        onClick={() => setCount((prev) => prev - 1)}
        disabled={count === 1}
      >
        <FaAngleLeft size={18} />
      </button>

      <p className="text-lg leading-[100%] text-[#8D8D8D]">{count}</p>

      <button
        className="cursor-pointer"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <FaAngleRight size={18} />
      </button>
    </div>
  );
};

export default Quantity;
