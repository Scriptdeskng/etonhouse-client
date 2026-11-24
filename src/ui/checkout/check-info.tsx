import RadioInput from "@/utils/inputs/radio";
import CheckProducts from "./check-products";
import CheckUser from "./check-user";
import { useEffect, useState } from "react";
import Checkbox from "@/utils/inputs/checkbox";
import { useForm } from "react-hook-form";
import { Order } from "@/types/order";
import Button from "@/utils/button";
import toast from "react-hot-toast";
import { useCreateOrder, usePayment } from "@/services/order.service";
import {
  useCreateAddress,
  useGetAddresses,
  useGetDefaultAddress,
} from "@/services/profile.service";
import clsx from "clsx";
import { OrderConvert } from "@/helpers/orderConvert";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

const methods = [
  { label: "Novac Payment (Recommended)", value: "nova" },
  // { label: "Mobile Wallet (Paystack)", value: "paystack" },
];

const CheckInfo = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { data: defaultAddress } = useGetDefaultAddress();
  const { data: addressesData } = useGetAddresses();
  const createAddress = useCreateAddress();
  const addresses = addressesData?.results || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Order>({
    mode: "onBlur",
  });

  const { mutate: createOrder, isPending: orderPending } = useCreateOrder();
  const { mutate: orderPayment, isPending: payPending } = usePayment();

  const [paymentMethod, setPaymentMethod] = useState("nova");
  const [checked, setChecked] = useState<boolean>(false);
  const [saveAddress, setSaveAddress] = useState<boolean>(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const selectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    if (!addressId) {
      setValue("firstName", user?.first_name || "");
      setValue("lastName", user?.last_name || "");
      setValue("phone", user?.phone || "");
      setValue("address", "");
      setValue("city", "");
      setValue("state", "");
      setValue("postalCode", "");
      setValue("country", "Nigeria");
      return;
    }

    const address = addresses.find((item: any) => String(item.id) === addressId);
    if (!address) return;
    setValue("firstName", address.first_name || "");
    setValue("lastName", address.last_name || "");
    setValue("phone", address.phone || "");
    setValue("address", address.address_line1 || "");
    setValue("city", address.city || "");
    setValue("state", address.state || "");
    setValue("postalCode", address.postal_code || "");
    setValue("country", address.country || "Nigeria");
  };

  useEffect(() => {
    if (defaultAddress?.id && !selectedAddressId) {
      setSelectedAddressId(String(defaultAddress.id));
      setValue("firstName", defaultAddress.first_name || "");
      setValue("lastName", defaultAddress.last_name || "");
      setValue("phone", defaultAddress.phone || "");
      setValue("address", defaultAddress.address_line1 || "");
      setValue("city", defaultAddress.city || "");
      setValue("state", defaultAddress.state || "");
      setValue("postalCode", defaultAddress.postal_code || "");
      setValue("country", defaultAddress.country || "Nigeria");
    }
  }, [defaultAddress, selectedAddressId, setValue]);

  async function onSubmit(data: Order) {
    if (!paymentMethod.trim()) {
      toast.error("Select a payment method!");
      return;
    }

    if (!checked) {
      toast.error("Accept our terms and condition!");
      return;
    }

    let addressId = selectedAddressId ? Number(selectedAddressId) : undefined;
    let isUsingSavedAddress = !!addressId;

    if (isAuthenticated && !selectedAddressId && saveAddress) {
      try {
        const res = await createAddress.mutateAsync({
          label: `Checkout Address ${Date.now()}`,
          address_type: "home",
          first_name: data.firstName,
          last_name: data.lastName,
          address_line1: data.address,
          address_line2: "",
          city: data.city,
          state: data.state,
          postal_code: data.postalCode,
          country: data.country,
          phone: data.phone,
          is_default: false,
        });

        addressId = res?.id;
        isUsingSavedAddress = true;
        toast.success("Address saved successfully");
      } catch (error: any) {
        if (error?.response?.data?.label) {
          toast.error("You already have an address with this label.");
          return;
        }
        toast.error("Failed to save address!");
        return;
      }
    }

    const cartStore = useCartStore.getState();

    const orderPayload = OrderConvert(
      { cart: cartStore.cart, packages: cartStore.packages },
      data,
      paymentMethod,
      { addressId, isUsingSavedAddress }
    );

    createOrder(orderPayload, {
      onSuccess: (res) => {
        orderPayment(
          {
            email: res?.guest_email ?? data.email,
            order_id: res?.id,
            reference: res?.order_number,
            payment_method: paymentMethod,
          },
          {
            onSuccess: (response) => {
              toast.success("Redirecting to payment...");
              window.location = response?.data?.authorization_url;
            },
            onError: () => {
              toast.error("Error loading payment method!");
            },
          }
        );
      },
      onError: () => {
        toast.error("Error occurred while creating order!");
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

      {isAuthenticated && addresses.length > 0 && (
        <div className="max-w-xl space-y-2">
          <label htmlFor="checkout-address" className="block text-sm font-medium text-[#333333]">
            Delivery address
          </label>
          <select
            id="checkout-address"
            value={selectedAddressId}
            onChange={(event) => selectAddress(event.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-3"
          >
            <option value="">Add a new delivery address</option>
            {addresses.map((address: any) => (
              <option key={address.id} value={String(address.id)}>
                {address.label || address.address_type || "Saved address"} — {address.address_line1}, {address.city}
                {address.is_default ? " (Default)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">
        <CheckUser register={register} errors={errors} setValue={setValue} />

        <CheckProducts />
      </div>

      {isAuthenticated && !selectedAddressId && (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="saveAddress"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="saveAddress" className="text-sm text-black-400">
            Save this address for future orders
          </label>
        </div>
      )}

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
            checked={paymentMethod === item.value}
            onChecked={(e) => setPaymentMethod(e.target.value)}
            key={item.value}
          />
        ))}
      </div>

      <Checkbox
        id="terms"
        label={
          <>
            I agree to the{" "}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-black-100"
            >
              Terms & Conditions
            </Link>
          </>
        }
        name="terms"
        value={checked}
        onChecked={(e) => setChecked(e.target.checked)}
      />

      <Button
        type="submit"
        text={orderPending || payPending ? "Placing..." : "Place order"}
        className={clsx(
          "px-8  !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center max-w-[700px]",
          "bg-[#333333] text-white"
        )}
        disabled={orderPending || payPending}
      />
    </form>
  );
};

export default CheckInfo;
