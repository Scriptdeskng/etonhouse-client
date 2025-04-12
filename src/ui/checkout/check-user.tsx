import Input from "@/utils/inputs/input";
import { useState } from "react";

const CheckUser = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    state: "",
    address: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="space-y-4">
      <Input
        label="Email address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="First Name"
        name="firstName"
        placeholder="Enter your first name"
        value={form.firstName}
        onChange={handleChange}
      />

      <Input
        label="Last Name"
        name="lastName"
        placeholder="Enter your last name"
        value={form.lastName}
        onChange={handleChange}
      />

      <Input
        label="Phone number"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        value={form.phone}
        onChange={handleChange}
      />

      <Input
        label="Country"
        name="country"
        placeholder="Enter your country"
        value={form.country}
        onChange={handleChange}
      />

      <Input
        label="State"
        name="state"
        placeholder="Enter your state"
        value={form.state}
        onChange={handleChange}
      />

      <Input
        label="Street address"
        name="address"
        type="text"
        placeholder="Enter your street address"
        value={form.address}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckUser;
