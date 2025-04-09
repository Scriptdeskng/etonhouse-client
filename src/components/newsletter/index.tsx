import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Newsletter = () => {
  return (
    <PageTitle
      title="NEWSLETTER"
      button={{ exists: true, text: "SUBSCRIBE", path: "/" }}
    >
      <div className="w-full grid lg:grid-cols-2 gap-8 xl:gap-20 items-center">
        <div className="w-full flex flex-col gap-8 text-black">
          <h3 className="text-lg sm:text-2xl font-bold">
            📩 Stay Inspired – Join Our Community
          </h3>

          <p>
            Be the first to know about exclusive deals, new collections, and
            design tips.
          </p>

          <input
            type="email"
            name="email"
            className="w-full max-w-[570px] rounded-[40px] px-5 h-10.5 xl:h-13.5 bg-transparent border border-[#616161] outline-none"
            placeholder="Enter your email address"
          />

          <Button
            text="Subscribe now"
            className="!py-4 !text-base w-full max-w-[570px]"
          />

          <div className="hidden xl:flex flex-col gap-5">
            <p>✅ Exclusive Discounts – Get special member-only offers</p>
            <p>✅ Design Inspiration – Fresh styling ideas for your space</p>
            <p>✅ Early Access – Shop new collections before anyone else</p>
          </div>
        </div>

        <div className="w-full relative h-[195px] sm:h-[330px]">
          <Image
            src="/assets/png/newsletter.png"
            alt="Newsletter"
            fill
            quality={100}
          />
        </div>
      </div>
    </PageTitle>
  );
};

export default Newsletter;
