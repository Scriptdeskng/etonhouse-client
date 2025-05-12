import { FaMinus, FaPlus } from "react-icons/fa6";

interface Props {
  count: number;
  handleQuantity?: (value: number) => void;
}

const CartQuantity = ({ count, handleQuantity }: Props) => {
  return (
    <div className="w-[90px] md:w-[100px] h-8 md:h-11 flex items-center justify-between text-[#616161] border border-[#A3A3A3] px-2">
      <button
        className="cursor-pointer"
        onClick={() => {
          if (handleQuantity) {
            handleQuantity(count - 1);
          }
        }}
      >
        <FaMinus size={10} />
      </button>

      <p className="text-xs md:text-lg leading-[100%] text-[#333333]">
        {count}
      </p>

      <button
        className="cursor-pointer"
        onClick={() => {
          if (handleQuantity) {
            handleQuantity(count + 1);
          }
        }}
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
};

export default CartQuantity;
