import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/webp/logo-black.webp"
        alt="etonhouse logo"
        width={177}
        height={25}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
