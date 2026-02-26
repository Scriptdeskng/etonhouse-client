import Link from "next/link";
import Image from "next/image";
import PageTitle from "@/utils/page-title";
import { useAllCategories } from "@/services/category.service";


const CATEGORY_IMAGES: Record<string, string> = {
  "living room": "/assets/features/2.jpg",
  "bedroom":     "/assets/features/4.jpg",
  "dining":      "/assets/features/1.jpg",
  "dinning":     "/assets/features/1.jpg",
  "accessories": "/assets/features/3.jpg",
};

const FALLBACK_IMAGE = "/assets/features/2.jpg";

function buildShopHref(categorySlug: string): string {
  const params = new URLSearchParams({ category: categorySlug });
  return `/shop?${params.toString()}`;
}

const FeaturedCollections = () => {
  const { data, isLoading } = useAllCategories();

  const categories: any[] = data?.results ?? [];

  return (
    <div className="bg-[#F6F6F6]">
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle
          title="FEATURED COLLECTION"
          background="bg-[#F6F6F6]"
          path="/shop"
        >
          <div className="w-full flex gap-3.5 md:grid md:grid-cols-2 md:gap-2 overflow-x-auto">
            {isLoading
              ? Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-full max-w-[250px] md:max-w-full h-[310px] xl:h-[400px] rounded-lg bg-gray-200 animate-pulse"
                    />
                  ))
              : categories.map((item) => {
                  const nameLower = (item.name ?? "").toLowerCase();
                  const image = CATEGORY_IMAGES[nameLower] ?? FALLBACK_IMAGE;
                  const href = buildShopHref(item.slug);

                  return (
                    <Link
                      href={href}
                      key={item.id ?? item.slug}
                      className="shrink-0 w-full max-w-[250px] md:max-w-full h-[310px] xl:h-[400px] relative flex items-center justify-center rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/40" />

                      <p className="relative z-10 text-lg xl:text-[32px] text-white font-semibold uppercase">
                        {item.name}
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