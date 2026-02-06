import Link from "next/link";
import Image from "next/image";
import PageTitle from "@/utils/page-title";

const FeaturedCollections = () => {
  const category = [
    { 
      title: "RUGS", 
      image: "/assets/newassets/rugs.png"
    },
    { 
      title: "SOFAS", 
      image: "/assets/newassets/sofa.jpg"
    },
    { 
      title: "ACCESSORIES", 
      image: "/assets/newassets/accessory.jpg"
    },
    { 
      title: "TABLES", 
      image: "/assets/newassets/tables.jpg"
    },
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
                  className="shrink-0 w-full max-w-[250px] md:max-w-full h-[310px] xl:h-[400px] relative flex items-center justify-center rounded-lg overflow-hidden group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/40" />
                  
                  <p className="relative z-10 text-lg xl:text-[32px] text-white font-semibold">
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