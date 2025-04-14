const TrackHeader = () => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px]">
      <div className="w-full h-21 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] text-2xl lg:text-[32px] font-bold">
          🚚 Track Your Order
        </p>
      </div>

      <div className="space-y-5 pb-8 lg:border-b-[0.6px] lg:border-[#61616133]">
        <p className="lg:text-lg font-medium text-[#333333]">
          📦 Order Number: #ORD-2025001
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          📅 Order Date: February 5, 2025
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          💳 Payment Status: ✅ Paid
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          📍 Shipping Address
        </p>
        <p className="lg:text-lg text-[#333333]">John Doe</p>
        <p className="lg:text-lg text-[#333333]">
          12B Victoria Island, Lagos, Nigeria
        </p>
        <p className="lg:text-lg font-medium text-[#333333]">
          📞 +234 800 123 4567
        </p>
      </div>
    </div>
  );
};

export default TrackHeader;
