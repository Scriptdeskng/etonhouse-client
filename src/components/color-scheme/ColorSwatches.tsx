export interface ColorSwatchOption {
  id: number;
  name: string;
}

interface ColorSwatchesProps<T extends ColorSwatchOption> {
  colors: T[];
  selectedColorId?: number | null;
  onSelect: (color: T) => void;
  isDisabled?: (color: T) => boolean;
  label: string;
  isLoading?: boolean;
}

const cssColorNames = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black
  blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse
  chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan
  darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta
  darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen
  darkslateblue darkslategray darkslategrey darkturquoise darkviolet
  deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite
  forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green
  greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender
  lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
  lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon
  lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue
  lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue
  mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen
  mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin
  navajowhite navy oldlace olive olivedrab orange orangered orchid
  palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff
  peru pink plum powderblue purple rebeccapurple red rosybrown royalblue
  saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue
  slateblue slategray slategrey snow springgreen steelblue tan teal thistle
  tomato turquoise violet wheat white whitesmoke yellow yellowgreen`
    .trim()
    .split(/\s+/)
);

const colorAliases: Record<string, string> = {
  grey: "gray",
  darkgrey: "darkgray",
  dimgrey: "dimgray",
  lightgrey: "lightgray",
  lightslategrey: "lightslategray",
  slategrey: "slategray",
};

const getCssColor = (name: string) => {
  const normalizedName = name.trim().toLowerCase().replace(/[\s_-]+/g, "");
  const cssName = colorAliases[normalizedName] || normalizedName;

  return cssColorNames.has(cssName) ? cssName : null;
};

const ColorSwatches = <T extends ColorSwatchOption,>({
  colors,
  selectedColorId,
  onSelect,
  isDisabled,
  label,
  isLoading = false,
}: ColorSwatchesProps<T>) => {
  const selectedColor = colors.find((color) => color.id === selectedColorId);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-black-400">{label}</p>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading colors...</p>
      ) : colors.length === 0 ? (
        <p className="text-sm text-gray-500">No colors available.</p>
      ) : (
        <div role="group" aria-label={label} className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isSelected = selectedColorId === color.id;
            const unavailable = isDisabled?.(color) ?? false;
            const cssColor = getCssColor(color.name);

            return (
              <button
                key={color.id}
                type="button"
                aria-label={`Select ${color.name}`}
                aria-pressed={isSelected}
                title={cssColor ? color.name : `${color.name} — preview unavailable`}
                disabled={unavailable}
                onClick={() => onSelect(color)}
                className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-black ring-2 ring-black/50 ring-offset-2"
                    : "border-gray-300 hover:border-gray-700"
                } ${unavailable ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
              >
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 rounded-sm border border-black/30"
                  style={
                    cssColor
                      ? { backgroundColor: cssColor }
                      : {
                          backgroundColor: "#f3f4f6",
                          backgroundImage:
                            "linear-gradient(45deg, #d1d5db 25%, transparent 25%), linear-gradient(-45deg, #d1d5db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d1d5db 75%), linear-gradient(-45deg, transparent 75%, #d1d5db 75%)",
                          backgroundSize: "8px 8px",
                          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
                        }
                  }
                />
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {selectedColor && (
        <p aria-live="polite" className="text-sm text-black-400">
          Selected color: <span className="font-semibold">{selectedColor.name}</span>
        </p>
      )}
    </div>
  );
};

export default ColorSwatches;
