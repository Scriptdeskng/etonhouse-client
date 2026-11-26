import ColorSwatches from "@/components/color-scheme/ColorSwatches";
import { AvailableColor } from "@/services/product.service";
import { TriggerIcon } from "../category";

const ColorScheme = ({
  handleParams,
  selectedColor,
  colors,
  isLoading,
}: {
  handleParams: (name: string, value: any) => void;
  selectedColor?: string;
  colors: AvailableColor[];
  isLoading: boolean;
}) => {
  const selectedColorId = colors.find((color) => color.name === selectedColor)?.id;

  return (
    <details className="w-full py-7.5 pb-10 group" open>
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Color</h2>
        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5">
        <ColorSwatches
          label="Filter by color"
          colors={colors}
          selectedColorId={selectedColorId}
          isLoading={isLoading}
          onSelect={(color) =>
            handleParams("color", selectedColor === color.name ? undefined : color.name)
          }
        />
      </div>
    </details>
  );
};

export default ColorScheme;
