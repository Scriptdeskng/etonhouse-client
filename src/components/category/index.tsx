import { useAllCategories } from "@/services/category.service";
import { FaMinus, FaPlus } from "react-icons/fa6";

export const TriggerIcon = ({
  size = 24,
  open,
  close,
  handleOpen,
  handleClose,
}: {
  size?: number;
  open: string;
  close: string;
  handleOpen?: () => void;
  handleClose?: () => void;
}) => {
  return (
    <>
      <div role="button" className={open} onClick={handleOpen}>
        <FaPlus size={size} />
      </div>

      <div role="button" className={`hidden ${close}`} onClick={handleClose}>
        <FaMinus size={size} />
      </div>
    </>
  );
};

const Category = ({
  handleParams,
  selectedCategory,
}: {
  handleParams: (name: string, value: any) => void;
  selectedCategory?: string;
}) => {
  const { data } = useAllCategories();

  return (
    <details className="w-full pb-10 border-b border-[#61616199] group" open>
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Product Categories</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5 pr-1 flex flex-col gap-3">
        {data?.results?.map((item: any) => {
          const isSelected = selectedCategory === item?.slug;
          
          return (
            <div
              key={item?.id}
              role="button"
              className={`text-base capitalize cursor-pointer transition-colors ${
                isSelected ? "text-black font-medium" : "text-[#616161] hover:text-black"
              }`}
              onClick={() => handleParams("category", isSelected ? undefined : item?.slug)}
            >
              {item?.name?.split("-").join(" ")}
            </div>
          );
        })}
      </div>
    </details>
  );
};

export default Category;