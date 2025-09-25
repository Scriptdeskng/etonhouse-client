'use client';

import React from 'react';
import { FaCalendar, FaLock, FaGlobe } from 'react-icons/fa';

interface RegistryHeaderProps {
  name: string;
  eventDate: string;
  description: string;
  coverImage?: string;
  accessType?: 'public' | 'private';
  overlay?: boolean;
  className?: string;
}

const RegistryHeader: React.FC<RegistryHeaderProps> = ({
  name,
  eventDate,
  description,
  coverImage,
  accessType,
  overlay = false,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (overlay && coverImage) {
    return (
      <div className={`relative h-[400px] lg:h-[500px] overflow-hidden ${className}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-white px-5">
          <div className="text-center max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              {name}
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-white/80" />
                <p className="text-lg text-white/90">
                  {formatDate(eventDate)}
                </p>
              </div>
              
              {accessType && (
                <div className="flex items-center gap-2">
                  {accessType === 'public' ? (
                    <FaGlobe className="text-white/80" />
                  ) : (
                    <FaLock className="text-white/80" />
                  )}
                  <span className="text-white/90 capitalize">{accessType}</span>
                </div>
              )}
            </div>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
      {coverImage && (
        <div className="h-[200px] lg:h-[300px] overflow-hidden">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendar size={16} />
            <span>{formatDate(eventDate)}</span>
          </div>
          
          {accessType && (
            <div className="flex items-center gap-2">
              {accessType === 'public' ? (
                <FaGlobe size={16} />
              ) : (
                <FaLock size={16} />
              )}
              <span className="capitalize">{accessType}</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
};

export default RegistryHeader;