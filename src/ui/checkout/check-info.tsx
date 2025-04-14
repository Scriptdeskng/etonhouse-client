import RadioInput from "@/utils/inputs/radio";
import CheckProducts from "./check-products";
import CheckUser from "./check-user";
import { useState } from "react";
import Checkbox from "@/utils/inputs/checkbox";
import ButtonLink from "@/utils/button/button-link";

const CheckInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checked, setChecked] = useState<boolean>(false);

  const methods = [
    { label: "Credit/Debit Card (Visa, MasterCard, Verve)", value: "Card" },
    { label: "Bank Transfer", value: "Transfer" },
    { label: "Pay on Delivery (Available in select locations)", value: "Cash" },
    { label: "Mobile Wallet (Flutterwave, Paystack, etc.)", value: "Wallet" },
  ];

  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentMethod(e.target.value);
  }

  console.log(paymentMethod, checked);

  return (
    <div className="pt-4 pb-24 space-y-[30px]">
      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-[30px] text-[#141414] font-bold">SHIPPING DETAILS</p>
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        <p className="md:text-lg font-medium text-[#333333]">
          📍 Where should we deliver your order?
        </p>
        <p className="italic text-[#616161] text-sm">
          Please ensure delivery address and phone number is correct for
          adequate delivery rates.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">
        <CheckUser />

        <CheckProducts />
      </div>

      <div className="w-full h-14 bg-[#D6DDD6] flex items-center">
        <p className="pl-2 lg:pl-[30px] text-[#141414] font-bold">
          PAYMENT METHOD
        </p>
      </div>

      <p className="lg:text-lg font-medium text-[#333333]">
        💳 Choose how you&apos;d like to pay
      </p>

      <div className="space-y-5">
        {methods.map((item) => (
          <RadioInput
            label={item.label}
            name="payment"
            value={item.value}
            onChecked={handleChecked}
            key={item.value}
          />
        ))}
      </div>

      <Checkbox
        id="terms"
        label="I agree to the Terms & Conditions"
        name="terms"
        value={checked}
        onChecked={(e) => setChecked(e.target.checked)}
      />

      <ButtonLink
        text="Place order"
        path="/confirmation"
        className="bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center max-w-[700px]"
      />
    </div>
  );
};

export default CheckInfo;
