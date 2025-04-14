import Modal from "@/utils/modal";
import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Galleria = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open}>
      <div className="w-full max-w-5xl px-3 md:px-8 xl:px-16 py-16 lg:h-[640px] relative bg-white flex flex-col gap-4">
        <button
          onClick={handleClose}
          className="z-10 absolute top-5 right-6 lg:top-15 lg:right-15 w-11 h-11 flex items-center justify-center rounded-full border-[0.4px] border-[#636363] cursor-pointer text-[#1F2A3778]"
        >
          <MdClose size={24} />
        </button>

        <p className="md:text-lg font-medium text-black">
          Elegant Couch for a Modern Living Room in a Lagos Apartment
        </p>

        <p className="text-sm md:text-base">
          Sofa Model X –{" "}
          <Link href="/product/1" className="underline text-[#8D8F08]">
            Click here
          </Link>{" "}
          to view details in the shop
        </p>

        <div className="w-full h-[300px] md:h-[360px] lg:h-[490px] relative">
          <Image
            src="/assets/png/enlarged.png"
            alt="enlarged"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Galleria;
