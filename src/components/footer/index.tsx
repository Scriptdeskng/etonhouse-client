import Link from "next/link";

const Footer = () => {
  const year = new Date().getUTCFullYear();

  return (
    <div className="w-full bg-black-200 px-5 py-10 space-y-10 xl:pt-25 xl:px-20 xl:pb-14 xl:space-y-20">
      <div className="w-full grid xl:grid-cols-[375px_auto] gap-10 xl:gap-30 text-white">
        <div className="space-y-8 xl:space-y-16">
          <div className="space-y-3.5">
            <p className="text-4xl text-white">
              <span className="font-bold">eton</span>house
            </p>

            <p className="text-sm md:text-lg text-white">
              Quality furniture for every space. Designed for comfort, built to
              last
            </p>
          </div>

          <div className="text-sm md:text-lg text-white font-medium space-y-4.5">
            <p>📍 Showroom Locations: Lagos</p>
            <p>📞 Customer Support: +2348090397777</p>
            <p>📩 Email: customer@etonhouseng.com</p>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-6 sm:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl text-white font-medium">
              Quick Links
            </h2>

            <div className="flex flex-col gap-5 text-sm md:text-base">
              <Link href="/">🏠 Home</Link>
              <Link href="/shop">🛒 Shop Furniture</Link>
              <Link href="/">🏢 Showrooms & In Situ</Link>
              <Link href="/">🎁 Gift Cards</Link>
              <Link href="/">🆘 Help & FAQs</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl text-white font-medium">
              Customer Support
            </h2>

            <div className="flex flex-col gap-5 text-sm md:text-base">
              <Link href="/">📦 Orders & Shipping</Link>
              <Link href="/">💳 Returns & Refunds</Link>
              <Link href="/">🔐 Privacy Policy</Link>
              <Link href="/">📜 Terms & Conditions</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl text-white font-medium">
              Stay Connected
            </h2>

            <div className="flex flex-col gap-5 text-sm md:text-base">
              <Link href="https://www.linkedin.com/company/etonhouse-nigeria/" target="_blank">LinkedIn</Link>
              <Link href="https://instagram.com/etonhouse" target="_blank">Instagram</Link>
              <Link href="https://www.facebook.com/EtonhouseNG" target="_blank">Facebook</Link>
              <Link href="https://api.whatsapp.com/send?phone=2348090397777" target="_blank">WhatsApp</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white pt-5">
        <p className="text-white md:text-lg text-center md:text-start">
          &copy; {year} Etonhouse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
