import Pricing from "@/ui/pricing";
import { TriggerIcon } from "../category";

const Range = () => {
  return (
    <details className="w-full py-7.5 pb-10 border-b border-[#61616199] group">
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Price Range</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-4">
        <Pricing />
      </div>
    </details>
  );
};

export default Range;
