import { TriggerIcon } from "../category";

const colors = [
  { hex: "#1B4C2D", name: "forest-green" },
  { hex: "#F6B76F", name: "peach" },
  { hex: "#0D1B39", name: "navy" },
  { hex: "#8D8D8D", name: "gray" },
  { hex: "#000000", name: "black" },
  { hex: "#4C1B3C", name: "plum" },
  { hex: "#BC3618", name: "rust" },
  { hex: "#90B8FA", name: "sky-blue" },
  { hex: "#8D8F08", name: "olive" },
  { hex: "#8110C6", name: "purple" },
  { hex: "#1B4C2D", name: "dark-green" },
  { hex: "#C8FFDC", name: "mint" },
  { hex: "#FFF7EF", name: "cream" },
  { hex: "#78382F", name: "brown" },
];

const ColorScheme = ({
  handleParams,
  selectedColor,
}: {
  handleParams: (name: string, value: any) => void;
  selectedColor?: string;
}) => {
  return (
    <details className="w-full py-7.5 pb-10 group" open>
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Color</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5 pr-4 grid grid-cols-7 gap-2">
        {colors.map((color, index) => {
          const isSelected = selectedColor === color.name;
          
          return (
            <div
              key={`${color.hex}-${index}`}
              className={`w-5 h-6 border rounded-[2px] cursor-pointer transition-all ${
                isSelected
                  ? "border-black border-2 ring-2 ring-offset-1 ring-black/30"
                  : "border-[#61616166] hover:border-black"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleParams("color", isSelected ? undefined : color.name)}
              title={color.name.split("-").join(" ")}
            />
          );
        })}
      </div>
    </details>
  );
};

export default ColorScheme;