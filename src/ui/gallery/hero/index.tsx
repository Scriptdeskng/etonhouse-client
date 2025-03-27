import { useState } from "react";
import Tabs from "../tabs";
import Image from "next/image";
import Pagination from "../pagination";

const GalleryHero = () => {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  return (
    <div className="px-20 py-10 border-t border-black-200/80 flex flex-col gap-10">
      <div className="flex flex-col gap-7.5 items-start">
        <h2 className="font-bold text-[32px]">Our Gallery</h2>
        <p className="text-2xl text-[#616161]">
          Explore beautifully styled spaces featuring our collections
        </p>
        <Tabs active={active} setActive={setActive} />
      </div>

      <div className="grid grid-cols-3 gap-7">
        {new Array(9).fill("").map((_, index) => {
          return (
            <div className="group relative w-full h-[480px]" key={index}>
              <Image
                src="/assets/png/gallery.png"
                alt="Gallery"
                fill
                objectFit="cover"
                quality={100}
              />

              <div className="hidden group-hover:flex w-full h-full absolute top-0 left-0 bg-black/40 justify-center items-center cursor-pointer">
                <div className="max-w-[190px] p-3.5 h-14.5 bg-[#DBDADA] text-xs font-medium text-black absolute top-0 left-0">
                  Elegant Couch in a Lagos Apartment
                </div>

                <p className="text-white">🔍 Click-to-Enlarge </p>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default GalleryHero;
