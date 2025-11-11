"use client";

import PackageGrid from "@/components/packages/PackageGrid";
import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useAllPackages } from "@/services/package.service";
import { useCartStore } from "@/store/cartStore";
import { Package } from "@/types/package";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const PackagesIndexPage: React.FC = () => {
  const { data, isLoading, isError } = useAllPackages({ page: 1 });
  const addPackageToCart = useCartStore((state) => state.addPackageToCart);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account?redirect=packages');
    }
  }, [isAuthenticated, router]);

  const handleBuyAll = async (pkg: Package) => {
    try {
      await addPackageToCart(pkg);
    } catch (error) {
      console.error("Error adding package to cart:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center py-20 h-screen flex items-center justify-center w-full">Loading packages...</p>;
  }

  if (isError) {
    return <p className="text-center py-20 text-red-500">Failed to load packages.</p>;
  }

  return (
    <Entrance>
      <Navbar active={3} />
      <div className="container max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20 pt-10 pb-32">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">Packages</h1>
          <p className="text-black-100">
            Furnish entire rooms with ready-made sets. Buy the whole package and save, or pick{" "}
            <br className="hidden lg:block" /> items individually at regular price
          </p>
        </div>

        <PackageGrid
          packages={data?.results || []}
          onBuyAll={handleBuyAll}
        />
      </div>
      <Footer />
    </Entrance>
  );
};

export default PackagesIndexPage;