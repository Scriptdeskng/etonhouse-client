import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSubscribeToNewsletter } from "@/services/newsletter.service";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeToNewsletter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await subscribe.mutateAsync(email.trim());
      toast.success(response?.detail || "Thanks for subscribing!");
      setEmail("");
    } catch (error: any) {
      const message = error?.response?.data?.email?.[0]
        || error?.response?.data?.detail
        || "Unable to subscribe right now. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-[1536px] mx-auto">
      <PageTitle
        title="NEWSLETTER"
        button={{ exists: true, text: "SUBSCRIBE", path: "#newsletter-form" }}
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
            <form id="newsletter-form" onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center text-center gap-5">
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
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full max-w-[570px] rounded-[40px] px-5 h-12 sm:h-13.5 bg-[#FDFEFD]/30 backdrop-blur-sm border-none outline-none text-black placeholder:text-white"
                placeholder="Enter your email address"
              />

              <Button
                type="submit"
                text={subscribe.isPending ? "Subscribing..." : "Subscribe now"}
                disabled={subscribe.isPending}
                className="!py-4 !text-base w-full max-w-[570px] !bg-white !text-black hover:!bg-gray-100 transition-colors"
              />

              <div className="hidden md:flex flex-col gap-3 sm:gap-4 mt-4 text-white">
                <p className="text-sm sm:text-base">✅ Exclusive Discounts – Get special member-only offers</p>
                <p className="text-sm sm:text-base">✅ Design Inspiration – Fresh styling ideas for your space</p>
                <p className="text-sm sm:text-base">✅ Early Access – Shop new collections before anyone else</p>
              </div>
            </form>
          </div>
        </div>
      </PageTitle>
    </div>
  );
};

export default Newsletter;
