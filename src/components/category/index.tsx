import { FaMinus, FaPlus } from "react-icons/fa6";

export const TriggerIcon = ({
  size = 24,
  open,
  close,
}: {
  size?: number;
  open: string;
  close: string;
}) => {
  return (
    <>
      <div className={open}>
        <FaPlus size={size} />
      </div>

      <div className={`hidden ${close}`}>
        <FaMinus size={size} />
      </div>
    </>
  );
};

const Category = () => {
  const categories = [
    {
      name: "Living room",
      subCategories: ["Sofas", "Chairs", "Tables"],
    },
    {
      name: "Dining room",
      subCategories: ["Dinner Set", "Dinner Table"],
    },
    {
      name: "Bedroom",
      subCategories: ["Bed Frame", "Mattress"],
    },
    {
      name: "Accessories",
      subCategories: ["Decor", "Lighting"],
    },
  ];

  return (
    <details className="w-full pb-10 border-b border-[#61616199] group">
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Product Categories</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5 pr-1 flex flex-col gap-5">
        {data?.results?.map((item: any) => {
          return (
            <details className="w-full group/subgroup" key={item.name}>
              <summary className="w-full flex items-center justify-between cursor-pointer">
                <h2 className="text-[#616161]">{item.name}</h2>

                <TriggerIcon
                  size={18}
                  open="group-open/subgroup:hidden"
                  close="group-open/subgroup:block"
                />
              </summary>

              <div className="mt-3.5 flex flex-col gap-2">
                {item.subCategories.map((data) => (
                  <p key={data} className="text-sm cursor-pointer">
                    {data}
                  </p>
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
