interface Props {
  id: string;
  name: string;
  label: string;
  value: boolean;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, name, label, value, onChecked }: Props) => {
  return (
    <div className="w-full flex items-center gap-2.5">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={value}
        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer border border-[#61616166] bg-[#F4F4F4]"
        onChange={onChecked}
      />

      <p className="text-sm md:text-lg leading-[100%] text-black">{label}</p>
    </div>
  );
};

export default Checkbox;
