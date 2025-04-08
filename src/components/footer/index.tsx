import Link from "next/link";

const Footer = () => {
  const year = new Date().getUTCFullYear();

  return (
    <div className="w-full bg-black-200 pt-25 px-20 pb-14 space-y-20">
      <div className="w-full grid grid-cols-[375px_auto] gap-30 text-white">
        <div className="space-y-16">
          <div className="space-y-3.5">
            <p className="text-4xl text-white">
              <span className="font-bold">eton</span>house
            </p>

            <p className="text-lg text-white">
              Quality furniture for every space. Designed for comfort, built to
              last
            </p>
          </div>

          <div className="text-lg text-white font-medium space-y-4.5">
            <p>📍 Showroom Locations: Lagos | Abuja </p>
            <p>📞 Customer Support: +234 800 123 4567</p>
            <p>📩 Email: hello@etonhouseng.com</p>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-white font-medium">Quick Links</h2>

            <div className="flex flex-col gap-5">
              <Link href="/">🏠 Home</Link>
              <Link href="/shop">🛒 Shop Furniture</Link>
              <Link href="/">🏢 Showrooms & In Situ</Link>
              <Link href="/">🎁 Gift Cards</Link>
              <Link href="/">🆘 Help & FAQs</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-white font-medium">
              Customer Support
            </h2>

            <div className="flex flex-col gap-5">
              <Link href="/">📦 Orders & Shipping</Link>
              <Link href="/">💳 Returns & Refunds</Link>
              <Link href="/">🔐 Privacy Policy</Link>
              <Link href="/">📜 Terms & Conditions</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-white font-medium">Stay Connected</h2>

            <div className="flex flex-col gap-5">
              <Link href="/">LinkedIn</Link>
              <Link href="/">Instagram</Link>
              <Link href="/">Pinterest</Link>
              <Link href="/">X</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white pt-5">
        <p className="text-white text-lg">
          &copy; {year} Etonhouse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
