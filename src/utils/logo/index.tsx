import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="w-[136px] h-5 xl:w-[177px] xl:h-[25px] relative">
        <Image
          src="/assets/webp/logo-black.webp"
          alt="etonhouse logo"
          fill
          className="object-contain"
          quality={100}
        />
      </div>
    </Link>
  );
};

export default Logo;
