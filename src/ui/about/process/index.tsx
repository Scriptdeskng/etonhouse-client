import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Process = () => {
  const data = [
    {
      img: "process1",
      title: "Inspired Design",
      text: "Our team of designers curates collections that blend functionality with aesthetics",
    },
    {
      img: "process2",
      title: "Sustainable Sourcing",
      text: "We handpick high-quality, ethically sourced materials for durability and sustainability",
    },
    {
      img: "process3",
      title: "Expert Craftsmanship",
      text: "Skilled artisans bring each design to life, ensuring precision and attention to detail.",
    },
  ];

  return (
    <PageTitle title="OUR PROCESS" button={{ exists: false }}>
      <div className="xl:p-10 gap-[30px] xl:gap-20 flex flex-wrap lg:flex-row justify-between">
        {data.map((item) => {
          return (
            <div
              className="mx-auto w-[305px] flex flex-col items-center gap-5 xl:gap-8.75"
              key={item.title}
            >
              <Image
                src={`/assets/svg/${item.img}.svg`}
                alt={item.title}
                width={60}
                height={60}
                quality={100}
              />

              <h4 className="text-lg md:text-xl font-medium text-black-400">
                {item.title}
              </h4>

              <p className="text-center md:text-lg text-black-400">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </PageTitle>
  );
};

export default Process;
