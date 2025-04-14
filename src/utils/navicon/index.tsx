import Image from "next/image";
import Link from "next/link";

interface Props {
  path: string;
  icon: string;
}

const NavIcon = ({ path, icon }: Props) => {
  return (
    <Link href={path} className="w-4.5 h-4.5 sm:w-6 sm:h-6 relative">
      <Image
        src={`/assets/svg/${icon}.svg`}
        alt={`${icon} icon`}
        fill
        className="object-contain"
        quality={100}
      />
    </Link>
  );
};

export default NavIcon;
