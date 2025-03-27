import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Testimonials = () => {
  return (
    <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
      <div className="w-full flex justify-center items-center gap-8">
        <div className="w-100 h-100 relative">
          <Image
            src="/assets/webp/testimonial.webp"
            alt="User"
            fill
            quality={100}
          />

          <div className="absolute left-0 bottom-3">
            <p className="text-2xl text-blue-200 font-bold">John Doe</p>
            <p className="text-[#5F6470]">SomeCompany LLC.</p>
          </div>
        </div>

        <div className="relative flex flex-col items-start">
          <Image
            src="/assets/svg/left-quote.svg"
            alt="Left Quote"
            width={53}
            height={46}
          />
          <p className="mt-3.5 ml-10 max-w-125.5 text-2xl text-blue-200">
            The quality of the furniture exceeded my expectations! The delivery
            was smooth, and the design fits perfectly in my home.
          </p>
          <div className="self-end -mr-10">
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
