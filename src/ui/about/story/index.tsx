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
              At EtonHouse, we believe that furniture is more than just
              decor—it’s the foundation of a home. What started as a small
              family-owned workshop has grown into a trusted destination for
              premium, handcrafted furniture
            </p>

            <p>
              With a passion for design and a commitment to quality, we create
              timeless pieces that blend style, comfort, and durability. Every
              product is crafted with care, ensuring that your space reflects
              your personality and lifestyle
            </p>
          </div>

          <Button text="View catalog" className="px-6 md:px-20 text-sm hidden xl:flex" />
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
