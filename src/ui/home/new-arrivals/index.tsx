import PageTitle from "@/utils/page-title";
import ProductCard from "@/utils/product/product-card";

interface Props {
  image: string;
  name: string;
  price: string;
}

const NewArrivals = () => {
  const arrive: Props[] = [
    {
      image: "new1",
      name: "New Product 1",
      price: "150,000",
    },
    {
      image: "new2",
      name: "New Product 2",
      price: "150,000",
    },
    {
      image: "new3",
      name: "New Product 3",
      price: "150,000",
    },
    {
      image: "new4",
      name: "New Product 4",
      price: "150,000",
    },
  ];

  return (
    <PageTitle title="NEW ARRIVALS" background="bg-white">
      <div className="w-full grid grid-cols-4 gap-10 pb-8 border-b border-black">
        {arrive.map((item) => {
          return (
            <ProductCard
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

export default NewArrivals;
