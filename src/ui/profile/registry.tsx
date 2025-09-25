'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Entrance from '@/animated/Entrance';
import { FaShare, FaEdit, FaPlus, FaCalendar, FaCheck, FaTrash, FaLock, FaGlobe, FaGift } from 'react-icons/fa';
import { useMyRegistries, useDeleteRegistry, useUpdateRegistry } from '@/services/registry.service';
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';
import { Registry, RegistryItem } from '@/types/registry';
import RegistryEmptyState from '@/components/registry/RegistryEmptyState';
import useAuthStore from '@/store/authStore';
import ShareRegistryModal from '@/components/registry/ShareRegistryModal';

const MyRegistries: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: registriesData, isLoading, error, refetch } = useMyRegistries();
  const deleteRegistryMutation = useDeleteRegistry();

  const [selectedRegistry, setSelectedRegistry] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [registryToShare, setRegistryToShare] = useState<Registry | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account?redirect=profile/registry');
    }
  }, [isAuthenticated, router]);

  const handleShare = (registry: Registry) => {
    setRegistryToShare(registry);
    setShowShareModal(true);
  };

  const handleUpdateRegistryAccess = async (isPublic: boolean) => {
    if (!registryToShare) return;

    try {
      const updateMutation = useUpdateRegistry(registryToShare.id);
      await updateMutation.mutateAsync({
        is_public: isPublic
      });

      if (registryToShare) {
        setRegistryToShare({
          ...registryToShare,
          is_public: isPublic
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleAddItems = (registryId: number) => {
    router.push(`/registry/catalog?registryId=${registryId}`);
  };

  const handleViewRegistry = (registryId: number) => {
    router.push(`/registry/${registryId}`);
  };

  const handleDeleteClick = (registryId: number) => {
    setSelectedRegistry(registryId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedRegistry) return;

    try {
      await deleteRegistryMutation.mutateAsync(selectedRegistry);
      toast.success('Registry deleted successfully');
      setShowDeleteConfirm(false);
      setSelectedRegistry(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete registry');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedRegistry(null);
  };

  const handleCreateRegistry = () => {
    router.push('/registry');
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

  const calculateProgress = (registry: Registry) => {
    if (!registry.items || registry.items.length === 0) {
      return { totalRequested: 0, totalFulfilled: 0, percentage: 0 };
    }

    const totalRequested = registry.items.reduce((sum, item) => sum + item.quantity_requested, 0);
    const totalFulfilled = registry.items.reduce((sum, item) => sum + item.quantity_fulfilled, 0);

    return {
      totalRequested,
      totalFulfilled,
      percentage: totalRequested > 0 ? (totalFulfilled / totalRequested) * 100 : 0
    };
  };

  const getRegistryStats = (registry: Registry) => {
    const totalItems = registry.items?.length || 0;
    const fulfilledItems = registry.items?.filter(item => item.is_fulfilled).length || 0;
    const partiallyFulfilledItems = registry.items?.filter(
      item => item.quantity_fulfilled > 0 && !item.is_fulfilled
    ).length || 0;

    return {
      totalItems,
      fulfilledItems,
      partiallyFulfilledItems,
      pendingItems: totalItems - fulfilledItems - partiallyFulfilledItems
    };
  };

  if (isLoading) {
    return (
      <Entrance>
        <div>
          <Skeleton height={40} width={200} className="mb-8" />
          <div className="space-y-6">
            {Array(2).fill(0).map((_, index) => (
              <Skeleton key={index} height={300} className="rounded-lg" />
            ))}
          </div>
        </div>
      </Entrance>
    );
  }

  if (error) {
    return (
      <Entrance>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">My Registries</h1>
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600 mb-4">Error loading registries. Please try again.</p>
            <button
              onClick={() => refetch()}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        </div>
      </Entrance>
    );
  }

  if (!registriesData?.results || registriesData.results.length === 0) {
    return (
      <Entrance>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">My Registries</h1>
          <RegistryEmptyState type="no-registry" />
        </div>
      </Entrance>
    );
  }

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-black-400">My Registries</h1>
        <button
          onClick={handleCreateRegistry}
          className="font-medium underline text-sm sm:text-base text-black-100"
        >
          Create New Registry
        </button>
      </div>

      <div className="space-y-8">
        {registriesData.results.map((registry: Registry) => {
          const progress = calculateProgress(registry);
          const stats = getRegistryStats(registry);
          const daysUntilEvent = Math.ceil((new Date(registry.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div key={registry.id} className="group">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="md:flex">

                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div>
                            <h2 className="sm:text-lg lg:text-xl text-black-400 cursor-pointer transition-colors"
                              onClick={() => handleViewRegistry(registry.id)}>
                              {registry.name}
                            </h2>

                            <div className="flex items-center gap-3 mt-1">
                              <span>
                                {daysUntilEvent > 0 && daysUntilEvent <= 30 && (
                                  <div className="border border-black-100 text-black-100 px-3 py-1 rounded-full text-xs font-medium">
                                    {daysUntilEvent} days left
                                  </div>
                                )}
                              </span>
                              <span className="px-2 py-1 border border-black-100 text-black-100 text-xs rounded-full">
                                {getTypeLabel(registry.type)}
                              </span>
                            </div>

                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <FaCalendar size={12} />
                            <span>{formatDate(registry.date)}</span>
                          </div>
                          {stats.totalItems > 0 && (
                            <div className="flex items-center gap-1">
                              <FaGift size={12} />
                              <span>{stats.totalItems} items</span>
                            </div>
                          )}
                        </div>

                        {registry.description && (
                          <p className="text-gray-600 line-clamp-2">{registry.description}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleShare(registry)}
                          className="px-3 py-1.5 border border-gray-300 rounded-full text-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          title="Share Registry"
                        >
                          <FaShare size={12} />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        <button
                          onClick={() => handleAddItems(registry.id)}
                          className="px-3 py-1.5 rounded-full border border-gray-300 text-black-400 text-sm font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          title="Add Items"
                        >
                          <FaPlus size={12} />
                          Add Items
                        </button>
                        <button
                          onClick={() => handleDeleteClick(registry.id)}
                          className="px-3 py-1.5 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-1.5"
                          title="Delete Registry"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>

                    {registry.items && registry.items.length > 0 && (
                      <div className="mt-6 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-black-400">
                            Gift Progress
                          </span>
                          <span className="text-xs sm:text-sm text-black-100">
                            {progress.totalFulfilled}/{progress.totalRequested} gifts fulfilled
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${progress.percentage === 100
                              ? 'bg-[#4D4D26]'
                              : progress.percentage > 50
                                ? 'bg-[#4D4D26]'
                                : 'bg-gray-400'
                              }`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {progress.percentage.toFixed(0)}% complete
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {registry.items && registry.items.length > 0 && (
                  <div className="border-t px-6 py-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {registry.items.slice(0, 3).map((item: RegistryItem, index: number) => (
                          <div
                            key={item.id}
                            className="w-10 h-10 rounded-full bg-white border-2 border-white overflow-hidden"
                            style={{ zIndex: 3 - index }}
                          >
                            <img
                              src={item.product_image || '/placeholder.png'}
                              alt={item.product}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {registry.items.length > 3 && (
                          <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">
                              +{registry.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleViewRegistry(registry.id)}
                        className="text-sm text-black hover:underline cursor-pointer"
                      >
                        View all items →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>



      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Delete Registry</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this registry? This action cannot be undone and all items will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteRegistryMutation.isPending}
                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteRegistryMutation.isPending ? 'Deleting...' : 'Delete Registry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Registry Modal */}
      <ShareRegistryModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setRegistryToShare(null);
        }}
        registry={registryToShare}
        onUpdateAccess={handleUpdateRegistryAccess}
      />
    </div>
  );
};

export default MyRegistries;