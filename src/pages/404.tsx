import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Button from "@/utils/button";
import Link from "next/link";
import SEO from "@/components/seo";

const NotFoundPage = () => {
  return (
    <Entrance>
      <div className="flex min-h-screen flex-col">
        <SEO title="Page Not Found" noIndex />
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-[#f7f7f7] px-5 py-20 text-center xl:px-20">
          <div className="max-w-2xl">
            <p className="text-8xl font-bold leading-none tracking-[-0.08em] text-[#d6ddd6] md:text-[12rem]">
              404
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#616161]">
              Page not found
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#141414] md:text-5xl">
              This space is waiting to be furnished.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#616161] md:text-lg">
              The page you’re looking for has moved or doesn’t exist. Let’s get you
              back to something beautiful.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/">
                <Button text="Back to home" className="!w-full !rounded-none !px-8 !py-4 !text-sm sm:!w-auto" />
              </Link>
              <Link href="/shop">
                <Button text="Browse the shop" className="!w-full !rounded-none !bg-[#d6ddd6] !px-8 !py-4 !text-sm !text-[#141414] sm:!w-auto" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Entrance>
  );
};

export default NotFoundPage;
