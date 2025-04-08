import PageTitle from "@/utils/page-title";
import ProductCard from "@/utils/product/product-card";

interface Props {
  id: number;
  image: string;
  name: string;
  price: string;
}

const RecentlyViewed = () => {
  const products: Props[] = [
    {
      id: 5,
      image: "new1",
      name: "New Product 1",
      price: "150,000",
    },
    {
      id: 6,
      image: "new2",
      name: "New Product 2",
      price: "150,000",
    },
    {
      id: 7,
      image: "new3",
      name: "New Product 3",
      price: "150,000",
    },
    {
      id: 8,
      image: "new4",
      name: "New Product 4",
      price: "150,000",
    },
  ];

  return (
    <PageTitle
      title="RECENTLY VIEWED"
      background="bg-white !px-0 !py-0"
      path="/shop"
      className="px-16"
    >
      <div className="px-16 w-full grid grid-cols-4 gap-10 pb-20 border-b border-black">
        {products.map((item) => {
          return (
            <ProductCard
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              key={item.name}
            />
          );
        })}
      </div>
    </PageTitle>
  );
};

export default RecentlyViewed;
