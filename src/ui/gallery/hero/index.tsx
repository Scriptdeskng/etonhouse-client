import { useState } from "react";
import Tabs from "../tabs";
import Image from "next/image";
import Pagination from "@/components/pagination";
import Galleria from "@/components/modal/galleria";

const GalleryHero = () => {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  // modals
  const [view, setView] = useState(false);

  return (
    <>
      <div className="px-5 py-8 xl:px-20 xl:py-10 border-t border-black-200/80 flex flex-col gap-10">
        <div className="flex flex-col gap-7.5 items-start">
          <h2 className="font-bold text-2xl md:text-[32px]">Our Gallery</h2>
          <p className="text-lg md:text-2xl text-[#616161]">
            Explore beautifully styled spaces featuring our collections
          </p>
          <Tabs active={active} setActive={setActive} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7">
          {new Array(9).fill("").map((_, index) => {
            return (
              <button
                className="group relative w-full h-[320px] md:h-[400px] xl:h-[480px]"
                key={index}
                onClick={() => setView(true)}
              >
                <Image
                  src="/assets/png/gallery.png"
                  alt="Gallery"
                  fill
                  className="object-cover"
                  quality={100}
                />

                <div className="hidden group-hover:flex w-full h-full absolute top-0 left-0 bg-black/40 justify-center items-center cursor-pointer">
                  <div className="max-w-[190px] p-3.5 h-14.5 bg-[#DBDADA] text-xs font-medium text-black absolute top-0 left-0">
                    Elegant Couch in a Lagos Apartment
                  </div>

                  <p className="text-white">🔍 Click-to-Enlarge </p>
                </div>
              </button>
            );
          })}
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>

      <Galleria open={view} handleClose={() => setView(false)} />
    </>
  );
};

export default GalleryHero;
