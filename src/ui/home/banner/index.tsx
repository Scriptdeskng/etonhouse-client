import NavIcon from "@/utils/navicon";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full bg-beige-100 px-20 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/svg/phone.svg"
          alt="phone icon"
          width={24}
          height={24}
          quality={100}
        />

        <p className="text-lg leading-0 text-black-200">
          Hotline: +234 345 789 2233
        </p>
      </div>

      <div className="flex items-center gap-4.5">
        <NavIcon icon="facebook" path="https://facebook.com" />
        <NavIcon icon="linkedin" path="https://linkedin.com" />
        <NavIcon icon="twitter" path="https://x.com" />
        <NavIcon icon="instagram" path="https://instagram.com" />
      </div>
    </div>
  );
};

export default Banner;
