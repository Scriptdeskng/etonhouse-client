interface Props {
  label?: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-3.5">
      {label && (
        <label htmlFor={label} className="text-sm md:text-base text-[#333333]">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-[0.3px] border-[#616161] bg-[#FDFEFD4D] text-sm md:text-base h-9.5 md:h-14 rounded-[20px] px-5 placeholder:text-[#616161] outline-[#D6DDD6]"
      />
    </div>
  );
};

export default Input;
