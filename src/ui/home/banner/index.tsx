import NavIcon from "@/utils/navicon";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full bg-beige-100">
    <div className="max-w-[1536px] mx-auto px-5 xl:px-20 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/svg/phone.svg"
          alt="phone icon"
          width={24}
          height={24}
          quality={100}
        />

        <p className="text-xs sm:text-lg leading-0 text-black-200">
          <span className="hidden sm:inline">Hotline:</span> +2348090397777
        </p>
      </div>

      <div className="hidden md:flex items-center gap-4.5">
        <NavIcon icon="facebook" path="https://www.facebook.com/EtonhouseNG" />
        <NavIcon icon="linkedin" path="https://www.linkedin.com/company/etonhouse-nigeria/" />
        <NavIcon icon="instagram" path="https://instagram.com/etonhouse" />
      </div>
    </div>
    </div>
  );
};

export default Banner;
