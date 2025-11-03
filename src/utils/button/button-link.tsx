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
      className={`bg-black-200 text-white rounded-[40px] sm:text-lg lg:text-xl cursor-pointer ${className}`}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
