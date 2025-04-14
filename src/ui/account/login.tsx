import Button from "@/utils/button";
import Checkbox from "@/utils/inputs/checkbox";
import Input from "@/utils/inputs/input";
import { useState } from "react";

const Login = () => {
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
        text="Login"
        className="bg-[#333333] text-white !rounded-none !text-sm !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
        handleClick={() => null}
        type="button"
      />
    </div>
  );
};

export default Login;
