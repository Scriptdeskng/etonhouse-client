const Shipping = () => {
  return (
    <div className="lg:pt-10 lg:pb-8 space-y-[30px]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-4 lg:pl-[30px] text-[#141414] lg:text-xl font-bold">
          SHIPPING DETAILS
        </p>
      </div>

      <div className="space-y-5 pb-8 lg:border-b-[0.6px] border-[#61616133]">
        <p className="lg:text-lg font-medium text-[#333333]">
          📍 Shipping Address
        </p>
        <p className="lg:text-lg text-[#333333]">John Doe</p>
        <p className="lg:text-lg text-[#333333]">
          12B Victoria Island, Lagos, Nigeria
        </p>
        <p className="lg:text-lg text-[#333333]">📞 +234 800 123 4567</p>
        <p className="lg:text-lg text-[#333333]">
          🚚 Estimated Delivery: February 10 - 12, 2025
        </p>
      </div>
    </div>
  );
};

export default Shipping;
