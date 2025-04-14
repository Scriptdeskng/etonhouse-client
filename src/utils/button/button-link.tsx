import Link from "next/link";

interface Props {
  path: string;
  text: string;
  className?: string;
}

const ButtonLink = ({ path, text, className }: Props) => {
  return (
    <Link
      href={path}
      className={`bg-black-200 text-white rounded-[40px] sm:py-3 lg:py-6 font-medium sm:text-lg lg:text-xl sm:h-full sm:w-auto sm:px-20 cursor-pointer ${className}`}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
