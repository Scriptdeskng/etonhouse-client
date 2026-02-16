import { registerSchema } from "@/schemas/register.schema";
import { useRegister } from "@/services/auth.service";
import Button from "@/utils/button";
import Input from "@/utils/inputs/input";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const register = useRegister();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
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

  async function handleSubmit() {
    try {
      await registerSchema.validate(form, { abortEarly: true });

      register.mutate({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        password2: form.password,
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  return (
    <div className="space-y-6 xl:pb-18">
      <p className="sm:text-xl font-bold text-[#333333]">REGISTER</p>

      <div className="space-y-5">

        <Input
          name="first_name"
          placeholder="Enter first name"
          value={form.first_name}
          onChange={handleChange}
        />

        <Input
          name="last_name"
          placeholder="Enter last name"
          value={form.last_name}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
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
        text={register.isPending ? "Registering..." : "Register now"}
        className="!border-[#333333] !border !text-[#333333] !bg-transparent !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
        handleClick={handleSubmit}
        type="button"
      />
    </div>
  );
};

export default Register;
