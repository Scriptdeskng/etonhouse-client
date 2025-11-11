import PageTitle from "@/utils/page-title";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className="w-full max-w-[1536px] mx-auto">
    <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
      <div className="flex flex-col gap-10 items-center md:flex-row justify-center">
        <div className="w-full lg:w-1/2">
          <Image
            src="/assets/testimonials/testimonial.png"
            alt="Testimonials"
            width={500}
            height={500}
            className="w-full h-auto lg:w-[600px] object-cover">
          </Image>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col-reverse gap-5 lg:flex-col">
          <div>
            <p>“Eton House furniture completely transformed my living room. The quality is outstanding, and it arrived exactly as pictured.”</p>

            <div className="flex flex-row items-center gap-3 my-3">
              <div className="h-0.25 w-8 bg-black" />
              <Image src="/assets/testimonials/header.png" alt="Quote" width={24} height={24} className="object-cover" />
              <p>Amaka O., Lagos</p>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <Image src="/assets/testimonials/frame1.png" alt="Frame 1" width={75} height={50} className="" />
            <Image src="/assets/testimonials/frame2.png" alt="Frame 2" width={75} height={50} className="" />
            <Image src="/assets/testimonials/frame3.png" alt="Frame 3" width={75} height={50} className="" />
          </div>
        </div>


      </div>
    </PageTitle>
    </div>
  );
};

export default Testimonials;
