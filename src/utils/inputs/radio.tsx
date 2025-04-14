interface Props {
  name: string;
  label: string;
  value: string;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = ({ name, label, value, onChecked }: Props) => {
  return (
    <div className="w-full flex items-center gap-2.5">
      <input
        type="radio"
        name={name}
        value={value}
        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer border border-[#61616166] bg-[#F4F4F4]"
        onChange={onChecked}
      />

      <p className="text-sm md:text-lg leading-[100%] text-black">{label}</p>
    </div>
  );
};

export default RadioInput;
