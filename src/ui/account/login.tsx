"use client";

import { useLogin } from "@/services/auth.service";
import Button from "@/utils/button";
import Checkbox from "@/utils/inputs/checkbox";
import Input from "@/utils/inputs/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const login = useLogin(redirect);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (form.email.trim() === "" || !form.email.includes("a")) {
      toast.error("Invalid email!");
      return;
    }

    if (form.password.trim() === "") {
      toast.error("Enter your password!");
      return;
    }

    login.mutate({ email: form.email, password: form.password });
  }

  return (
    <div className="space-y-6">
      <p className="sm:text-xl font-bold text-[#333333]">LOGIN</p>

      <div className="space-y-5">
        <Input
          name="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="py-2">
        <Checkbox
          id="remember"
          name="remember"
          label="Remember me?"
          value={remember}
          onChecked={(e) => setRemember(e.target.checked)}
        />
      </div>

      <Button
        text={login.isPending ? "Signing in..." : "Login"}
        className="bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
        handleClick={handleSubmit}
        type="button"
      />
    </div>
  );
};

export default Login;
