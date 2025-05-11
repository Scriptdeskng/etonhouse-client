import { useState } from "react";
import { Range } from "react-range";

const Pricing = ({
  handleChange,
}: {
  handleChange: (min: number, max: number) => void;
}) => {
  const [values, setValues] = useState([50000, 500000]);

  const minLimit = 50000;
  const maxLimit = 500000;

  return (
    <div className="w-full">
      <Range
        step={10000}
        min={minLimit}
        max={maxLimit}
        values={values}
        onChange={(newValues) => {
          setValues(newValues);
          handleChange(newValues[0], newValues[1]);
        }}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-1 bg-gray-300 relative rounded">
            <div
              className="absolute bg-black h-1 rounded"
              style={{
                left: `${
                  ((values[0] - minLimit) / (maxLimit - minLimit)) * 100
                }%`,
                right: `${
                  100 - ((values[1] - minLimit) / (maxLimit - minLimit)) * 100
                }%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-3 h-3 bg-[#4B4B4B] rounded-full shadow-md cursor-pointer"
          />
        )}
      />

      <div className="flex justify-between mt-3 text-[#616161] text-sm font-medium">
        <span>(₦{values[0].toLocaleString()})</span>
        <span>(₦{values[1].toLocaleString()})</span>
      </div>
    </div>
  );
};

export default Pricing;
