import { useEffect } from "react";
import { Order } from "@/types/order";
import Input from "@/utils/inputs/input";
import useAuthStore from "@/store/authStore";
import { useGetDefaultAddress } from "@/services/profile.service";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

const CheckUser = ({
  register,
  errors,
  setValue,
}: {
  register: UseFormRegister<Order>;
  errors: FieldErrors<Order>;
  setValue: UseFormSetValue<Order>;
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const { data: defaultAddress, isLoading: addressLoading } = useGetDefaultAddress();

  useEffect(() => {
    if (isAuthenticated && user) {
      setValue("email", user.email || "");
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("phone", user.phone || "");
      setValue("country", "Nigeria");
    }
  }, [isAuthenticated, user, setValue]);

  useEffect(() => {
    if (defaultAddress) {
      setValue("firstName", defaultAddress.first_name || "");
      setValue("lastName", defaultAddress.last_name || "");
      setValue("phone", defaultAddress.phone || "");
      setValue("address", defaultAddress.address_line1 || "");
      setValue("city", defaultAddress.city || "");
      setValue("state", defaultAddress.state || "");
      setValue("postalCode", defaultAddress.postal_code || "");
      setValue("country", defaultAddress.country || "Nigeria");
    }
  }, [defaultAddress, setValue]);

  if (addressLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">Loading your details...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email address"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
        error={errors?.email}
        disabled={isAuthenticated}
      />

      <Input
        label="First Name"
        placeholder="Enter your first name"
        register={register("firstName", {
          required: "First Name is required",
        })}
        error={errors?.firstName}
      />

      <Input
        label="Last Name"
        placeholder="Enter your last name"
        register={register("lastName", {
          required: "Last Name is required",
        })}
        error={errors?.lastName}
      />

      <Input
        label="Phone number"
        type="tel"
        placeholder="Enter your phone number"
        register={register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^\+?[0-9\s\-]{7,15}$/,
            message: "Invalid phone number",
          },
        })}
        error={errors?.phone}
      />

      <Input
        label="Country"
        placeholder="Enter your country"
        register={register("country", {
          required: "Country is required",
        })}
        error={errors?.country}
      />

      <Input
        label="Street address"
        type="text"
        placeholder="Enter your street address"
        register={register("address", {
          required: "Address is required",
        })}
        error={errors?.address}
      />

      <Input
        label="State"
        placeholder="Enter your state"
        register={register("state", {
          required: "State is required",
        })}
        error={errors?.state}
      />

      <Input
        label="City"
        placeholder="Enter your city"
        register={register("city", {
          required: "City is required",
        })}
        error={errors?.city}
      />

      <Input
        label="Postal Code"
        placeholder="Enter your postal code"
        register={register("postalCode", {
          required: "Postal code is required",
        })}
        error={errors?.postalCode}
      />
    </div>
  );
};

export default CheckUser;