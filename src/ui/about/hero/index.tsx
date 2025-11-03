import Image from "next/image";

const AboutHero = () => {
  return (
    <div className="py-8 px-6">
      <div className="relative rounded-[20px] w-full h-[35vh] sm:h-[50vh] lg:h-[85vh]">
        <div className="absolute top-8 lg:top-16 xl:top-30 z-10 left-1/2 transform -translate-x-1/2">
          <Image
            src="/assets/webp/logo-black.webp"
            alt="About Hero"
            width={368}
            height={52}
            quality={100}
          />
        </div>

        <Image
          src="/assets/webp/about-hero.webp"
          alt="About Hero"
          fill
          quality={100}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default AboutHero;
