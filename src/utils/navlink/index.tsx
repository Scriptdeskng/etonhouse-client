import Link from "next/link";

interface Props {
  text: string;
  path: string;
  active: number;
  index: number;
}

const NavLink = ({ text, path, active, index }: Props) => {
  return (
    <Link
      href={path}
      className={`text-[16px] ${
        active === index ? "text-black cursor-default" : "text-black-100"
      } font-medium`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
