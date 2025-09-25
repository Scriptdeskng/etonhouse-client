'use client';

import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface RegistryProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  onAddToRegistry: (productId: string, quantity: number) => void;
}

const RegistryProductCard: React.FC<RegistryProductCardProps> = ({
  id,
  name,
  image,
  price,
  onAddToRegistry
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToRegistry = async () => {
    setIsAdding(true);
    try {
      await onAddToRegistry(id, quantity);
      toast.success(`Added ${quantity} ${name} to registry`);
      setQuantity(1);
      setIsAdded(true);
    } catch (error) {
      toast.error('Failed to add item to registry');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full border border-[#e5e7eb] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="w-full h-[200px] sm:h-[240px] lg:h-[280px] relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply p-4"
          width={500}
          height={500}
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm lg:text-base font-medium text-black-400 line-clamp-2 truncate">
            {name}
          </h3>
          <p className="text-base lg:text-lg font-semibold text-black-400">
            ₦{price.toLocaleString('en-GB')}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 border border-[#A3A3A3] rounded-md p-1">
            <button
              onClick={handleDecrement}
              disabled={isAdded}
              className="w-6 h-6 flex items-center justify-center text-black-100 hover:bg-white rounded transition-colors disabled:opacity-50 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <FaAngleLeft size={16} />
            </button>
            
            <span className="w-6 text-center font-medium text-black-100">
              {quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              disabled={isAdded}
              className="w-6 h-6 flex items-center justify-center text-black-100 hover:bg-white rounded transition-colors disabled:opacity-50"
              aria-label="Increase quantity cursor-pointer"
            >
              <FaAngleRight size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToRegistry}
          disabled={isAdding || isAdded}
          className="w-full text-black-400 py-2.5 rounded-full border border-black-400 font-medium text-sm hover:bg-black-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isAdding ? 'Adding...' : isAdded ? 'Added' : 'Add to Registry'}
        </button>
        
      </div>
    </div>
  );
};

export default RegistryProductCard;
