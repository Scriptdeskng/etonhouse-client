import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Newsletter = () => {
  return (
    <div className="w-full max-w-[1536px] mx-auto">
      <PageTitle
        title="NEWSLETTER"
        button={{ exists: true, text: "SUBSCRIBE", path: "/" }}
      >
        <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[600px] overflow-hidden">
          <Image
            src="/assets/newassets/timeless.png"
            alt="Newsletter"
            fill
            quality={100}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex items-center justify-center px-5 sm:px-10 md:px-16">
            <div className="w-full max-w-2xl flex flex-col items-center text-center gap-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                📩 Stay Inspired – Join Our Community
              </h3>

              <p className="text-white text-base sm:text-lg">
                Be the first to know about exclusive deals, new collections, and
                design tips.
              </p>

              <input
                type="email"
                name="email"
                className="w-full max-w-[570px] rounded-[40px] px-5 h-12 sm:h-13.5 bg-[#FDFEFD]/30 backdrop-blur-sm border-none outline-none text-black placeholder:text-white"
                placeholder="Enter your email address"
              />

              <Button
                text="Subscribe now"
                className="!py-4 !text-base w-full max-w-[570px] !bg-white !text-black hover:!bg-gray-100 transition-colors"
              />

              <div className="flex flex-col gap-3 sm:gap-4 mt-4 text-white">
                <p className="text-sm sm:text-base">✅ Exclusive Discounts – Get special member-only offers</p>
                <p className="text-sm sm:text-base">✅ Design Inspiration – Fresh styling ideas for your space</p>
                <p className="text-sm sm:text-base">✅ Early Access – Shop new collections before anyone else</p>
              </div>
            </div>
          </div>
        </div>
      </PageTitle>
    </div>
  );
};

export default Newsletter;