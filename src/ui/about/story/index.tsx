import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Story = () => {
  return (
    <PageTitle
      title="OUR STORY"
      background="bg-[#F7F7F7]"
      button={{ exists: false }}
    >
      <div className="w-full grid lg:grid-cols-2 items-center gap-6 xl:gap-20">
        <div className="flex flex-col items-start gap-7.5">
          <div className="flex flex-col gap-6 lg:gap-13 text-black md:text-xl">
            <p>
              At EtonHouse, we believe furniture is more than décor. It is the
              foundation of a home and a true expression of lifestyle. What
              began as a small, family-owned workshop has evolved into Eton
              House Nigeria, an indigenous company established in 2000, and
              today a trusted destination for premium, handcrafted home and
              office furniture.
            </p>

            <p>
              Driven by a passion for design and an uncompromising commitment to
              quality, we specialize in the manufacturing of high-quality
              furniture and finishes. Our team is made up of trained design
              professionals and highly skilled craftsmen who, supported by
              cutting-edge technology, bring timeless pieces to life while
              blending style, comfort, and durability. From bespoke furniture to
              full turnkey projects, we deliver exceptional solutions for
              hotels, luxury apartments, and small to large-scale homes and
              offices. Every piece we create is crafted with care, ensuring each
              space reflects the personality, taste, and lifestyle of those who
              live and work in it.
            </p>
          </div>

          <Button
            text="View catalog"
            className="px-6 md:px-20 text-sm hidden xl:flex"
          />
        </div>

        <div className="w-full h-[300px] md:h-[505px] relative">
          <Image
            src="/assets/webp/story.webp"
            alt="Story Couch"
            className="object-contain"
            fill
            quality={100}
          />
        </div>
      </div>
    </PageTitle>
  );
};

export default Story;
