'use client';

import React from 'react';
import { FaGift, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface RegistryEmptyStateProps {
  type?: 'no-registry' | 'no-items';
  registryId?: string;
  onAction?: () => void;
}

const RegistryEmptyState: React.FC<RegistryEmptyStateProps> = ({
  type = 'no-items',
  registryId,
  onAction
}) => {
  const router = useRouter();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (type === 'no-items' && registryId) {
      router.push(`/registry?registryId=${registryId}`);
    } else if (type === 'no-registry') {
      router.push('/registry');
    }
  };

  const content = {
    'no-registry': {
      icon: <FaGift size={48} className="text-gray-300" />,
      title: "No Registry Yet",
      description: "Create your first gift registry and share it with friends and family",
      buttonText: "Create Registry",
      buttonIcon: <FaPlus size={16} />
    },
    'no-items': {
      icon: <FaGift size={48} className="text-gray-300" />,
      title: "Oops! You haven't added anything yet",
      description: "Start building your registry by browsing our catalog and selecting items you'd love to receive",
      buttonText: "Add Items",
      buttonIcon: <FaPlus size={16} />
    }
  };

  const { icon, title, description, buttonText, buttonIcon } = content[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {description}
        </p>
        
        <button
          onClick={handleAction}
          className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        >
          {buttonIcon}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default RegistryEmptyState;