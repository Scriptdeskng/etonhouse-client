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
}: {
  handleParams: (name: string, value: any) => void;
}) => {
  const { data } = useAllCategories();

  return (
    <details className="w-full pb-10 border-b border-[#61616199] group">
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Product Categories</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5 pr-1 flex flex-col gap-5">
        {data?.map((item: any) => {
          return (
            <details className="w-full group/subgroup" key={item?.id}>
              <summary className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-[#616161] capitalize">
                  {item?.name?.split("-").join(" ")}
                </h2>

                <TriggerIcon
                  size={18}
                  open="group-open/subgroup:hidden"
                  close="group-open/subgroup:block"
                  handleOpen={() => handleParams("category", item?.slug)}
                  handleClose={() => handleParams("category", undefined)}
                />
              </summary>

              <div className="mt-3.5 flex flex-col gap-2">
                {item?.subcategories?.map((data: any) => (
                  <div
                    role="button"
                    key={data?.id}
                    className="text-sm cursor-pointer"
                    onClick={() => handleParams("subcategory", data?.slug)}
                  >
                    {data?.name}
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </details>
  );
};

export default Category;
