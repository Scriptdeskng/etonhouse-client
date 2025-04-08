import PageTitle from "@/utils/page-title";

const FeaturedCollections = () => {
  const category = [
    { title: "LIGHTS", bg: "cat1" },
    { title: "SOFAS", bg: "cat2" },
    { title: "KITCHEN", bg: "cat3" },
    { title: "TABLES", bg: "cat4" },
  ];

  return (
    <PageTitle
      title="FEATURED COLLECTION"
      background="bg-grey-300"
      path="/shop"
    >
      <div className="w-full grid grid-cols-2 gap-2">
        {category.map((item) => {
          return (
            <div
              className={`w-full h-[500px] flex items-center justify-center rounded-lg ${item.bg}`}
              key={item.title}
            >
              <p className="text-[32px] text-white">{item.title}</p>
            </div>
          );
        })}
      </div>
    </PageTitle>
  );
};

export default FeaturedCollections;
