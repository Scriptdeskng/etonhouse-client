interface Props {
  type?: "button" | "submit";
  text: string;
  className?: string;
  handleClick?: any;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  text,
  className,
  handleClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-black-200 text-white rounded-[40px] py-6 font-medium md:text-xl cursor-pointer ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
