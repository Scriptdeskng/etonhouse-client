import Link from "next/link";
import PageTitle from "@/utils/page-title";

const FeaturedCollections = () => {
  const category = [
    { title: "LIGHTS", bg: "cat1" },
    { title: "SOFAS", bg: "cat2" },
    { title: "KITCHEN", bg: "cat3" },
    { title: "TABLES", bg: "cat4" },
  ];

  return (
    <div className="bg-[#F6F6F6]">
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle
          title="FEATURED COLLECTION"
          background="bg-[#F6F6F6]"
          path="/shop"
        >
          <div className="w-full flex gap-3.5 md:grid md:grid-cols-2 md:gap-2 overflow-x-auto">
            {category.map((item) => {
              return (
                <Link
                  href="/shop"
                  key={item.title}
                  className={`shrink-0 w-full max-w-[250px] md:max-w-full h-[310px] xl:h-[400px] flex items-center justify-center rounded-lg ${item.bg}`}
                >
                  <p className="text-lg xl:text-[32px] text-white">
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </PageTitle>
      </div>
    </div>
  );
};

export default FeaturedCollections;
