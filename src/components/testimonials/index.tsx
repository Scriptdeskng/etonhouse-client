// import PageTitle from "@/utils/page-title";
// import Image from "next/image";

// const Testimonials = () => {
//   return (
//     <div className="w-full max-w-[1536px] mx-auto">
//     <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
//       <div className="flex flex-col gap-10 items-center md:flex-row justify-center">
//         <div className="w-full lg:w-1/2">
//           <Image
//             src="/assets/testimonials/testimonial.png"
//             alt="Testimonials"
//             width={500}
//             height={500}
//             className="w-full h-auto lg:w-[600px] object-cover">
//           </Image>
//         </div>

//         <div className="w-full lg:w-1/2 flex flex-col-reverse gap-5 lg:flex-col">
//           <div>
//             <p>“Eton House furniture completely transformed my living room. The quality is outstanding, and it arrived exactly as pictured.”</p>

//             <div className="flex flex-row items-center gap-3 my-3">
//               <div className="h-0.25 w-8 bg-black" />
//               <Image src="/assets/testimonials/header.png" alt="Quote" width={24} height={24} className="object-cover" />
//               <p>Amaka O., Lagos</p>
//             </div>
//           </div>

//           <div className="flex flex-row gap-5">
//             <Image src="/assets/testimonials/frame1.png" alt="Frame 1" width={75} height={50} className="" />
//             <Image src="/assets/testimonials/frame2.png" alt="Frame 2" width={75} height={50} className="" />
//             <Image src="/assets/testimonials/frame3.png" alt="Frame 3" width={75} height={50} className="" />
//           </div>
//         </div>


//       </div>
//     </PageTitle>
//     </div>
//   );
// };

// export default Testimonials;


"use client";

import PageTitle from "@/utils/page-title";
import Image from "next/image";
import { useAllTestimonials } from "@/services/testimonial.service"; 
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useAllTestimonials();

  const testimonials = data?.results || [];

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </PageTitle>
      </div>
    );
  }

  if (isError || testimonials.length === 0) {
    return (
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No testimonials available at the moment.</p>
          </div>
        </PageTitle>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];
  const visibleThumbnails = getVisibleTestimonials();

  return (
    <div className="w-full max-w-[1536px] mx-auto">
      <PageTitle title="TESTIMONIALS" button={{ exists: false }}>
        <div className="flex flex-col gap-10 items-center md:flex-row justify-center">
          <div className="w-full lg:w-1/2">
            <Image
              src={currentTestimonial.product_image || "/assets/testimonials/testimonial.png"}
              alt="Testimonial Product"
              width={500}
              height={500}
              className="w-full h-auto lg:w-[600px] object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col-reverse gap-5 lg:flex-col">
            <div>
              <p>"{currentTestimonial.message}"</p>

              <div className="flex flex-row items-center gap-3 my-3">
                <div className="h-0.25 w-8 bg-black" />
                <Image
                  src={currentTestimonial.buyer_image || "/assets/testimonials/header.png"}
                  alt="Buyer"
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
                <p>{currentTestimonial.name}</p>
              </div>
            </div>

            <div className="flex flex-row gap-5 items-center">
              <button
                onClick={handlePrevious}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {visibleThumbnails.map((testimonial, idx) => (
                <button
                  key={testimonial.id}
                  onClick={() => setCurrentIndex((currentIndex + idx) % testimonials.length)}
                  className={`transition-opacity ${idx === 0 ? "opacity-100" : "opacity-60"}`}
                >
                  <Image
                    src={testimonial.product_image || "/assets/testimonials/frame1.png"}
                    alt={`Thumbnail ${idx + 1}`}
                    width={75}
                    height={50}
                    className="object-cover"
                  />
                </button>
              ))}

              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </PageTitle>
    </div>
  );
};

export default Testimonials;
