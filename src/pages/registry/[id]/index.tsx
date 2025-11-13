'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Entrance from '@/animated/Entrance';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { FaCalendar, FaShare, FaCheck } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useSingleRegistry } from '@/services/registry.service';
import { useCartStore } from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';
import { Registry, RegistryItem } from '@/types/registry';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Image from 'next/image';

const ViewRegistry: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const registryId = id as string;
  const { user } = useAuthStore();

  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});
  const [showShareModal, setShowShareModal] = useState(false);

  const { data: registry, isLoading, error } = useSingleRegistry(registryId);
  const { addToCart } = useCartStore();

  const isOwner = user && registry && (
    registry.owner === user.id ||
    registry.owner === user.email ||
    registry.owner === user.username
  );

  useEffect(() => {
    if (registry && !isOwner) {
      const initialQuantities: { [key: string]: number } = {};
      registry.items.forEach((item: RegistryItem) => {
        if (!item.is_fulfilled) {
          initialQuantities[item.id] = 1;
        }
      });
      setSelectedQuantities(initialQuantities);
    }
  }, [registry, isOwner]);

  const handleQuantityChange = (itemId: number, change: number) => {
    const item = registry?.items?.find((i: RegistryItem) => i.id === itemId);
    if (!item || isOwner) return;

    const currentQty = selectedQuantities[itemId] || 1;
    const newQty = currentQty + change;
    const remaining = item.quantity_requested - item.quantity_fulfilled;
    if (newQty >= 1 && newQty <= remaining) {
      setSelectedQuantities(prev => ({
        ...prev,
        [itemId]: newQty
      }));
    }
  };

  const handleBuyGift = (item: RegistryItem) => {
    if (isOwner) return;

    const quantity = selectedQuantities[item.id] || 1;

    addToCart({
      id: item.id,
      name: `${item.product}`,
      image: item.product_image || '/placeholder.png',
      price: Number(item.product_price),
      quantity: quantity
    });

    toast.success(`Added ${quantity} ${item.product} to cart`);

    setSelectedQuantities(prev => ({
      ...prev,
      [item.id]: 1
    }));
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <Entrance>
        <Navbar active={4} />
        <div className="min-h-screen bg-gray-50">
          <Skeleton height={500} />
          <div className="max-w-[1200px] mx-auto px-5 py-12">
            <Skeleton height={40} width={300} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} height={400} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </Entrance>
    );
  }

  if (error || !registry) {
    return (
      <Entrance>
        <Navbar active={4} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registry Not Found</h2>
            <p className="text-gray-600">This registry may be private or does not exist.</p>
          </div>
        </div>
        <Footer />
      </Entrance>
    );
  }

  return (
    <Entrance>
      <Navbar active={4} />

      <div className="min-h-screen py-10 px-5 sm:px-10 lg:px-20 max-w-[1536px] mx-auto">
        <div className="relative h-[200px] lg:h-[300px] overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: registry.cover_image
                ? `url(${registry.cover_image})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative h-full flex items-center text-white px-5">
            <div>
              <h1 className="text-xl font-bold mb-3 lg:text-2xl">
                {registry.name}
              </h1>

              <p className=" text-white/90 mb-3 lg:text-lg">
                {formatDate(registry.date)}
              </p>

              <p className="text-white/90 max-w-2xl mx-auto lg:text-lg">
                {registry.description}
              </p>
            </div>
          </div>
        </div>

        <div className="py-12">

          {registry.items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No items have been added to this registry yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
              {registry.items.map((item: RegistryItem) => {
                const remaining = item.quantity_requested - item.quantity_fulfilled;
                const isFulfilled = item.is_fulfilled;
                const selectedQty = selectedQuantities[item.id] || 1;

                return (
                  <div
                    key={item.id}
                    className="relative overflow-hidden border border-gray-200"
                  >
                    <div className="relative h-[180px] sm:h-[220px] lg:h-[330px]">
                      <Image
                        src={item.product_image || '/placeholder.png'}
                        alt={item.product}
                        className="w-full h-full object-contain p-4"
                        width={500}
                        height={500}
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-black-400">{item.product}</h3>
                        <p className="font-semibold text-black-400 mt-2">
                          ₦{Number(item.product_price).toLocaleString('en-GB')}
                        </p>
                      </div>

                      {isOwner && (
                        <div className='mt-2 text-black-400'>
                          <p>Quantity needed: {item.quantity_requested}</p>
                        </div>
                      )}

                      {!isOwner && !isFulfilled && (
                        <div className="space-y-3 pt-2">

                          <div className="flex items-center gap-2 rounded-md p-1 border w-fit py-1 sm:py-1.5 border-[#E2E8F0]">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-6 flex items-center justify-center text-[#A3A3A3] rounded cursor-pointer transition-colors"
                              disabled={selectedQty <= 1}
                            >
                              <GoChevronLeft size={17} />
                            </button>

                            <span className="w-8 text-center text-[#A3A3A3]">
                              {selectedQty}
                            </span>

                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-6 flex items-center justify-center text-[#A3A3A3] cursor-pointer transition-colors"
                              disabled={selectedQty >= remaining}
                            >
                              <GoChevronRight size={17} />
                            </button>
                          </div>

                          <div className="text-sm">
                            {isFulfilled ? (
                              <p className="text-sm text-black-100">
                                ( Fulfilled )
                              </p>
                            ) : (
                              <p className="text-black-100">
                                ( {remaining} of {item.quantity_requested} still needed )
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => handleBuyGift(item)}
                            className="w-full py-2.5 px-4 border border-black-400 text-black-400 rounded-full font-medium text-sm hover:bg-black-400 hover:text-white duration-300 ease-linear cursor-pointer transition-colors"
                            disabled={isFulfilled}
                          >
                            Buy Gift
                          </button>
                        </div>
                      )}
                    </div>

                    {!isOwner && isFulfilled && (
                      <div className="border border-[#8D8F08]/15 px-3 py-1 rounded-full absolute top-2 left-2  flex items-center gap-2 text-[#717309]">
                        <span className="text-sm">Fulfilled</span>
                        <FaCheck size={12} />
                      </div>
                    )}

                    {isOwner && isFulfilled && (
                      <div>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                          <div className="bg-white px-8 py-3 rounded-full flex items-center gap-2 text-[#717309]">
                            <span className="text-sm">Fulfilled</span>
                            <FaCheck size={12} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </Entrance>
  );
};

export default ViewRegistry;