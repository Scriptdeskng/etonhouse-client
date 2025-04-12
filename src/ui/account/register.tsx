import Button from "@/utils/button";
import Input from "@/utils/inputs/input";
import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="space-y-6 xl:pb-24">
      <p className="sm:text-xl font-bold text-[#333333]">REGISTER</p>

      <div className="space-y-5">
        <Input
          name="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          placeholder="Enter a password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="py-2">
        <p className="text-sm lg:text-base text-[#616161]">
          A link to set a new password will be sent to your email address.
        </p>
      </div>

      <Button
        text="Register now"
        className="!border-[#333333] !border !text-[#333333] !bg-transparent !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
        handleClick={() => null}
        type="button"
      />
    </div>
  );
};

export default Register;
