import RadioInput from "@/utils/inputs/radio";
import CheckProducts from "./check-products";
import CheckUser from "./check-user";
import { useState } from "react";
import Checkbox from "@/utils/inputs/checkbox";
import { useForm } from "react-hook-form";
import { Order } from "@/types/order";
import Button from "@/utils/button";
import toast from "react-hot-toast";
import { useCreateOrder } from "@/services/order.service";

const methods = [
  { label: "Credit/Debit Card (Visa, MasterCard, Verve)", value: "Card" },
  { label: "Bank Transfer", value: "Transfer" },
  { label: "Pay on Delivery (Available in select locations)", value: "Cash" },
  { label: "Mobile Wallet (Flutterwave, Paystack, etc.)", value: "Wallet" },
];

const CheckInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>({
    mode: "onBlur",
  });

  const order = useCreateOrder();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [checked, setChecked] = useState<boolean>(false);

  function onSubmit(data: Order) {
    if (paymentMethod.trim() === "") {
      toast.error("Select a payment method!");
      return;
    }

    if (!checked) {
      toast.error("Accept our terms and condition!");
      return;
    }

    order.mutate({
      payment_method: paymentMethod,
      email: data.email,
      shipping_address: {
        address_line1: data.address,
        city: data.city,
        country: data.country,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        state: data.state,
        postal_code: data.postalCode,
      },
    });
  }

  return (
    <form
      className="pt-4 pb-24 space-y-[30px]"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <CheckUser register={register} errors={errors} />

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
            onChecked={(e) => setPaymentMethod(e.target.value)}
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

      <Button
        type="submit"
        text={order.isPending ? "Placing..." : "Place order"}
        className="px-8 bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center max-w-[700px]"
      />
    </form>
  );
};

export default CheckInfo;
