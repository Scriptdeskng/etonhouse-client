"use client";

import Button from "@/utils/button";
import PageTitle from "@/utils/page-title";
import Link from "next/link";
import { useAllShowrooms } from "@/services/showroom.service";

const Showroom = () => {
  const { data, isLoading, isError } = useAllShowrooms();

  const showrooms = data?.results || [];
  const primaryShowroom = showrooms[0];

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle
          title="VISIT OUR SHOWROOM"
          button={{ exists: false }}
        >
          <div className="xl:p-3">
            <div className="w-full h-[350px] lg:h-[590px] flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Loading showroom information...</p>
            </div>
          </div>
        </PageTitle>
      </div>
    );
  }

  if (isError || !primaryShowroom) {
    return (
      <div className="w-full max-w-[1536px] mx-auto">
        <PageTitle
          title="VISIT OUR SHOWROOM"
          button={{ exists: false }}
        >
          <div className="xl:p-3">
            <div
              className="w-full h-[350px] lg:h-[590px] flex flex-col items-center justify-center gap-7 text-white p-2"
              style={{
                backgroundColor: "#f5f5f5",
                backgroundImage: `url('/assets/bg/showroom.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="lg:text-2xl font-bold">Visit Our Showroom</p>
              <p className="p-1 max-w-[530px] text-center text-sm lg:text-base">
                Showroom information is currently unavailable. Please check back later.
              </p>
            </div>
          </div>
        </PageTitle>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1536px] mx-auto">
      <PageTitle
        title="VISIT OUR SHOWROOM"
        button={{ 
          exists: true, 
          text: "GET DIRECTIONS", 
          path: primaryShowroom.google_map_link || "/" 
        }}
      >
        <div className="xl:p-3">
          <div
            className="w-full h-[350px] lg:h-[590px] flex flex-col items-center justify-center gap-7 text-white p-2"
            style={{
              backgroundColor: "#f5f5f5",
              backgroundImage: `url('/assets/bg/showroom.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="lg:text-2xl font-bold">{primaryShowroom.name || "Visit Our Showroom"}</p>

            <p className="p-1 max-w-[530px] text-center text-sm lg:text-base">
              Want to experience our furniture in person? Visit our showroom and
              let us help you find the perfect piece for your home
            </p>

            <p className="text-sm text-center lg:text-base">
              📍 {primaryShowroom.address}
            </p>

            <p className="text-sm text-center lg:text-base">
              📅 Monday – Saturday | {formatTime(primaryShowroom.opening_time)} – {formatTime(primaryShowroom.closing_time)}
            </p>

            {primaryShowroom.google_map_link && (
              <Link 
                href={primaryShowroom.google_map_link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  text="Get directions"
                  className="!bg-white !text-black-400 w-[200px] xl:w-full max-w-[550px] !py-4 !text-base !px-8"
                />
              </Link>
            )}
          </div>

          {showrooms.length > 1 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showrooms.slice(1).map((showroom) => (
                <div key={showroom.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">{showroom.name}</h3>
                  <p className="text-gray-600 mb-2">📍 {showroom.address}</p>
                  <p className="text-gray-600 mb-4">
                    📅 {formatTime(showroom.opening_time)} – {formatTime(showroom.closing_time)}
                  </p>
                  {showroom.google_map_link && (
                    <Link 
                      href={showroom.google_map_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Get Directions →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTitle>
    </div>
  );
};

export default Showroom;