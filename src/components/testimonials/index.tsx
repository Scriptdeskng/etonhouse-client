import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Testimonials = () => {
  return (
    <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
      <div className="w-full flex flex-col md:flex-row justify-center md:items-center gap-8">
        <div className="h-20 w-full sm:h-60 md:w-100 md:h-100 relative flex items-center gap-8 md:flex-none">
          <div className="w-20 h-20 sm:w-60 sm:h-60 md:w-full md:h-full relative">
            <Image
              src="/assets/webp/testimonial.webp"
              alt="User"
              fill
              quality={100}
              className="object-cover"
            />
          </div>

          <div className="md:absolute md:left-0 md:bottom-3">
            <p className="text-lg sm:text-2xl md:text-xl lg:text-2xl text-blue-200 font-bold">
              John Doe
            </p>
            <p className="text-sm sm:text-base md:text-sm lg:text-base text-[#5F6470]">
              SomeCompany LLC.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col items-start">
          <Image
            src="/assets/svg/left-quote.svg"
            alt="Left Quote"
            width={53}
            height={46}
            className="hidden lg:flex"
          />

          <p className="lg:mt-3.5 xl:ml-10 w-full max-w-125.5 text-sm sm:text-2xl md:text-xl xl:text-2xl text-black xl:text-blue-200 pr-4 sm:pr-12 md:pr-0">
            The quality of the furniture exceeded my expectations! The delivery
            was smooth, and the design fits perfectly in my home.
          </p>

          <div className="self-end -mr-10 hidden xl:flex">
            <Image
              src="/assets/svg/right-quote.svg"
              alt="Left Quote"
              width={53}
              height={46}
            />
          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Testimonials;
