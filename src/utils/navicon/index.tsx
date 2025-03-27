import Image from "next/image";
import Link from "next/link";

interface Props {
  path: string;
  icon: string;
}

const NavIcon = ({ path, icon }: Props) => {
  return (
    <Link href={path}>
      <Image
        src={`/assets/svg/${icon}.svg`}
        alt={`${icon} icon`}
        width={24}
        height={24}
        quality={100}
      />
    </Link>
  );
};

export default NavIcon;
