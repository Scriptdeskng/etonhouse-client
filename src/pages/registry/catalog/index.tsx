'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Entrance from '@/animated/Entrance';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import RegistryProductCard from '@/components/registry/RegistryProductCard';
import { useAllProducts } from '@/services/product.service';
import { useAddItemToRegistry, useSingleRegistry } from '@/services/registry.service';
import Skeleton from 'react-loading-skeleton';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import RegistrySidebar from '@/components/registry/RegistrySidebar';

const RegistryCatalog: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const registryId = searchParams.get('registryId');

  const [params, setParams] = useState({
    page: 1,
    search: '',
    category: undefined as string | undefined,
    subcategory: undefined as string | undefined,
    price_min: undefined as number | undefined,
    price_max: undefined as number | undefined,
  });

  const [searchInput, setSearchInput] = useState('');
  const [addedItems, setAddedItems] = useState<{ [key: string]: number }>({});

  const { data: productsData, isLoading: productsLoading } = useAllProducts(params);
  const { data: registryData } = useSingleRegistry(registryId || '');
  const addItemMutation = useAddItemToRegistry();

  useEffect(() => {
    if (!registryId) {
      toast.error('Registry ID is missing');
      router.push('/registry/my-registries');
    }
  }, [registryId, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams(prev => ({
        ...prev,
        search: searchInput,
        page: 1
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleAddToRegistry = async (productId: string, quantity: number) => {
    if (!registryId) {
      toast.error('Registry ID is missing');
      return;
    }

    try {
      const product = productsData?.results?.find((p: any) => p.id === productId);
      const variantId = product?.variants?.[0]?.id;

      await addItemMutation.mutateAsync({
        registryId,
        data: {
          product_id: Number(productId),
          product_variant_id: variantId,
          product_price: parseFloat(product?.current_price) || 0,
          quantity_requested: quantity,
        }
      });

      setAddedItems(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + quantity
      }));

      toast.success(`Added ${quantity} item(s) to your registry`);
    } catch (error: any) {
      console.error('Error adding item to registry:', error);
      toast.error(error?.response?.data?.message || 'Failed to add item to registry');
      throw error;
    }
  };

  const handleParams = (name: string, value: any) => {
    setParams(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handleClear = () => {
    setParams(prev => ({
      page: 1,
      search: prev.search,
      category: undefined,
      subcategory: undefined,
      price_min: undefined,
      price_max: undefined,
    }));
  };

  const handleBackToRegistry = () => {
    router.push(`/dashboard/registry`);
  };

  const getTotalItemsAdded = () => {
    return Object.values(addedItems).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <Entrance>
      <Navbar active={5} />

      <div className="w-full grid max-w-[1536px] mx-auto lg:grid-cols-[300px_auto] items-start">
        <RegistrySidebar handleParams={handleParams} handleClear={handleClear} />

        <div className="w-full">
          <div className="max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20 pt-10 pb-32">
            <div className="mb-8">
              <button
                onClick={handleBackToRegistry}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
              >
                <FaArrowLeft size={16} />
                <span>Back to Registry</span>
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Add Items to {registryData?.name || 'Registry'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Browse our catalog and select items for your registry
                  </p>
                </div>

                {getTotalItemsAdded() > 0 && (
                  <div className="text-black-400 border w-32 sm:w-44 flex items-center justify-center border-text-100 text-sm sm:text-base py-1 sm:py-2 rounded-full gap-1">
                    <span className="font-medium">{getTotalItemsAdded()} items </span>  added
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="relative max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
              {productsLoading ? (
                Array(20)
                  .fill({})
                  .map((_, index) => (
                    <Skeleton className="w-full h-[380px] rounded-lg" key={index} />
                  ))
              ) : productsData?.results?.length < 1 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  {(params.search || params.category || params.subcategory || params.price_min || params.price_max) && (
                    <button
                      onClick={() => {
                        setSearchInput('');
                        handleClear();
                      }}
                      className="mt-4 text-black underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                productsData?.results?.map((product: any) => (
                  <RegistryProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.images?.[0]?.image || '/placeholder.png'}
                    price={Number(product.current_price)}
                    onAddToRegistry={handleAddToRegistry}
                  />
                ))
              )}
            </div>

            {!productsLoading && productsData?.count > 18 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setParams(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={params.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {params.page} of {Math.ceil(productsData.count / 18)}
                </span>
                <button
                  onClick={() => setParams(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={params.page >= Math.ceil(productsData.count / 18)}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {getTotalItemsAdded() > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                <div className="max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                      {getTotalItemsAdded()} items added to your registry
                    </p>
                    <button
                      onClick={() => router.push('/dashboard/registry')}
                      className="bg-black-400 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
                    >
                      View Registry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Entrance>
  );
};

export default RegistryCatalog;