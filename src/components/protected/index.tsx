"use client";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Protected = ({
  redirect,
  children,
}: {
  redirect?: string | null;
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push(`/account?redirect=${redirect}`);
    }
  }, [mounted, isAuthenticated, router, redirect]);

  if (!mounted || !isAuthenticated) return null;

  return <>{children}</>;
};

export default Protected;
