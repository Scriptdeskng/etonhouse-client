import Image from "next/image";

const AboutHero = () => {
  return (
    <div className="md:py-8 md:px-6">
      <div className="relative w-full h-[70vh] sm:h-[50vh] lg:h-[85vh] md:rounded-[20px] overflow-hidden ">
        <div className="absolute top-12 lg:top-16 xl:top-24 z-10 left-1/2 transform -translate-x-1/2">
          <Image
            src="/assets/webp/logo-black.webp"
            alt="About Hero"
            width={368}
            height={52}
            quality={100}
          />
        </div>

        <Image
          src="/assets/about/aboutHero.jpg"
          alt="About Hero"
          fill
          quality={100}
          loading="eager"
          className="object-cover md:rounded-4xl"
        />
      </div>
    </div>
  );
};

export default AboutHero;