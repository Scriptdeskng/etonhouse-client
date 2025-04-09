import PageTitle from "@/utils/page-title";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  image: string;
}

const Recommended = () => {
  const products: Props[] = [
    {
      id: 1,
      image: "chair1",
    },
    {
      id: 2,
      image: "chair2",
    },
    {
      id: 3,
      image: "chair3",
    },
    {
      id: 4,
      image: "chair4",
    },
  ];

  return (
    <PageTitle
      title="RECOMMENDED FOR YOU"
      background="bg-white !px-0 !py-10 xl:py-0"
      path="/shop"
      className="px-5 xl:px-16"
    >
      <div className="px-5 xl:px-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 lg:pb-20 lg:border-b border-black">
        {products.map((item) => {
          return (
            <Link
              href={`/product/${item.id}`}
              className="relative bg-[#FAFAFA] flex items-center justify-center h-[340px] w-full"
              key={item.id}
            >
              <Image
                src={`/assets/webp/${item.image}.webp`}
                alt={`Product ${item.id}`}
                fill
                className="object-contain"
                quality={100}
              />
            </Link>
          );
        })}
      </div>
    </PageTitle>
  );
};

export default Recommended;
