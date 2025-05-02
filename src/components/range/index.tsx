import Pricing from "@/ui/pricing";
import { TriggerIcon } from "../category";
import { useDebouncedCallback } from "use-debounce";

const Range = ({
  handleParams,
}: {
  handleParams: (name: string, value: any) => void;
}) => {
  const debouncedHandleChange = useDebouncedCallback(
    (min: number, max: number) => {
      handleParams("price_min", min);
      handleParams("price_max", max);
    },
    500
  );

  function handleChange(min: number, max: number) {
    debouncedHandleChange(min, max);
  }

  return (
    <details className="w-full py-7.5 pb-10 border-b border-[#61616199] group">
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Price Range</h2>

        <TriggerIcon
          open="group-open:hidden"
          close="group-open:block"
          handleClose={() => {
            handleParams("price_min", undefined);
            handleParams("price_max", undefined);
          }}
        />
      </summary>

      <div className="mt-4">
        <Pricing handleChange={handleChange} />
      </div>
    </details>
  );
};

export default Range;
