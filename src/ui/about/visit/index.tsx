import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";
import Link from "next/link";

const Visit = () => {
  return (
    <PageTitle
      title="VISIT OUR SHOWROOM"
      button={{ exists: true, path: "", text: "GET DIRECTIONS" }}
    >
      <p className="font-medium text-lg xl:text-xl">
        Find a showroom near you or explore real-life setups!
      </p>

      <div className="xl:pr-8">
        <div className="w-full grid md:grid-cols-2 bg-[#FBFBFB]">
          <Link href="https://www.google.com/maps/dir/?api=1&destination=59A+Mainland+Way,+Dolphine+Estate,+Lagos+106104,+Lagos" target="_blank" rel="noopener noreferrer" className="w-full h-[270px] md:h-auto relative">
            <Image
              src="/assets/png/eton-house.png"
              alt="Lagos Showroom"
              fill
              className="object-cover"
            />
          </Link>

          <div className="w-full flex flex-col gap-6 px-5 py-[30px] xl:pl-10 xl:pr-20 xl:py-8">
            <h3 className="text-black-400 text-xl xl:text-2xl font-bold">Eton House</h3>

            <p className="xl:text-lg font-medium">Lagos, Nigeria</p>

            <p className="text-[#616161] font-medium">
              59A Mainland way, Dolphin estate, Ikoyi
            </p>

            <div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Location</p>
                <p>59A Mainland way, Dolphin estate, Ikoyi</p>
              </div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Phone</p>
                <p>+2348090397777</p>
              </div>
              <div className="w-full flex items-center justify-between py-3 xl:py-4 border-b border-[#616161]/50 font-medium text-black-400 xl:text-lg">
                <p className="font-bold">Opening hours</p>
                <p>Mon-Sat: 9AM - 7PM</p>
              </div>
            </div>

            <Link href="https://www.google.com/maps/dir/?api=1&destination=59A+Mainland+Way,+Dolphine+Estate,+Lagos+106104,+Lagos" target="_blank" rel="noopener noreferrer">
            <Button
              text="Visit"
              className="!w-full !text-sm !rounded-none !py-3"
            />
            </Link>

          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Visit;
