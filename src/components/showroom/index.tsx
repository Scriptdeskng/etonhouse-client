import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";

const Showroom = () => {
  return (
    <PageTitle
      title="VISIT OUR SHOWROOM"
      button={{ exists: true, text: "GET DIRECTIONS", path: "/" }}
    >
      <div className="xl:p-3">
        <div
          className="w-full h-[350px] lg:h-[590px] flex flex-col items-center justify-center gap-7 text-white"
          style={{
            backgroundColor: "#f5f5f5",
            backgroundImage: `url('/assets/bg/showroom.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="lg:text-2xl font-bold">Visit Our Showroom</p>

          <p className="max-w-[530px] text-center text-sm lg:text-base">
            Want to experience our furniture in person? Visit our showroom and
            let us help you find the perfect piece for your home
          </p>

          <p className="text-sm lg:text-base">
            📍 123 Furniture Lane, Lagos, Nigeria
          </p>

          <p className="text-sm lg:text-base">
            📅 Monday – Saturday | 10 AM – 6 PM
          </p>

          <Button
            text="Get directions"
            className="!bg-white !text-black-400 w-[200px] xl:w-full max-w-[550px] !py-4 !text-base"
          />
        </div>
      </div>
    </PageTitle>
  );
};

export default Showroom;
