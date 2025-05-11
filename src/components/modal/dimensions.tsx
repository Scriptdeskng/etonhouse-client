import Modal from "@/utils/modal";
import Image from "next/image";
import { MdClose } from "react-icons/md";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Dimensions = ({ open, handleClose }: Props) => {
  const size = [
    { name: "Width", number: "200 cm" },
    { name: "Height", number: "85 cm" },
    { name: "Depth", number: "90 cm" },
    { name: "Seat Height", number: "45 cm" },
    { name: "Armrest Height", number: "60 cm" },
  ];

  const specs = [
    "Weight: 25 kg",
    "Frame Material: Solid Wood",
    "Upholstery: Premium Fabric",
  ];

  return (
    <Modal open={open}>
      <div className="w-full grid lg:grid-cols-2 lg:h-[640px] relative">
        <button
          onClick={handleClose}
          className="z-10 absolute top-6 right-6 lg:top-15 lg:right-15 w-11 h-11 flex items-center justify-center rounded-full border-[0.4px] border-[#636363] cursor-pointer text-[#1F2A3778]"
        >
          <MdClose size={24} />
        </button>

        <div className="relative w-full h-full bg-white flex items-center justify-center">
          <Image
            src="/assets/webp/dimension.webp"
            alt="Dimension"
            fill
            quality={100}
            className="object-contain"
          />
        </div>

        <div className="w-full bg-[#F8F8F9] px-4 lg:px-10 py-10 lg:py-20 space-y-5 relative">
          <p className="md:text-xl font-bold text-[#333333]">
            Product Dimensions
          </p>

          <div className="space-y-4">
            {size.map((item) => (
              <div key={item.name} className="flex items-center gap-3.5">
                <Image
                  src="/assets/svg/size.svg"
                  alt="size"
                  width={18}
                  height={18}
                  quality={100}
                />

                <p className="text-sm md:text-base text-[#616161] font-medium">
                  {item.name} {item.number}
                </p>
              </div>
            ))}
          </div>

          <p className="md:text-xl font-bold text-[#333333]">
            Weight & Material (Additional Specs)
          </p>

          <div className="space-y-4">
            {specs.map((item) => (
              <p
                className="text-sm md:text-base text-[#616161] font-medium"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Dimensions;
