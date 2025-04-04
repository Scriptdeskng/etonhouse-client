import { TriggerIcon } from "../category";

const ColorScheme = () => {
  const colors = [
    "#1B4C2D",
    "#F6B76F",
    "#0D1B39",
    "#8D8D8D",
    "#000000",
    "#4C1B3C",
    "#BC3618",
    "#90B8FA",
    "#8D8F08",
    "#8110C6",
    "#1B4C2D",
    "#C8FFDC",
    "#FFF7EF",
    "#78382F",
  ];

  return (
    <details className="w-full py-7.5 pb-10 group">
      <summary className="w-full flex items-center justify-between cursor-pointer">
        <h2 className="text-lg font-bold text-black">Color</h2>

        <TriggerIcon open="group-open:hidden" close="group-open:block" />
      </summary>

      <div className="mt-3.5 pr-4 grid grid-cols-7 gap-2">
        {colors.map((color) => (
          <div
            key={color}
            className="w-5 h-6 border border-[#61616166] rounded-[2px] cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </details>
  );
};

export default ColorScheme;
