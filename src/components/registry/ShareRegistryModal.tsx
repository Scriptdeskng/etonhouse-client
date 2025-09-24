'use client';

import React, { useState } from 'react';
import { Registry } from '@/types/registry';
import { 
  FaTimes, 
  FaWhatsapp, 
  FaFacebookF, 
  FaEnvelope,
  FaLink,
  FaCheck
} from 'react-icons/fa';
import { IoCopyOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

interface ShareRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  registry: Registry | null;
  onUpdateAccess?: (isPublic: boolean) => void;
}

const ShareRegistryModal: React.FC<ShareRegistryModalProps> = ({
  isOpen,
  onClose,
  registry,
  onUpdateAccess
}) => {
  const [copied, setCopied] = useState(false);
  const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);
  
  if (!isOpen || !registry) return null;

  const shareUrl = `${window.location.origin}/registry/${registry.id}`;
  
  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Check out my ${getTypeLabel(registry.type)} registry!\n\n${registry.name}\n${registry.description || ''}\n\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `${registry.name} - ${getTypeLabel(registry.type)} Registry`;
    const body = `Hi there!\n\nI wanted to share my ${getTypeLabel(registry.type)} registry with you.\n\n${registry.name}\n${registry.description || ''}\n\nView the registry here: ${shareUrl}\n\nThank you!`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleAccessChange = async (isPublic: boolean) => {
    if (registry.is_public === isPublic) return;
    
    setIsUpdatingAccess(true);
    try {
      if (onUpdateAccess) {
        await onUpdateAccess(isPublic);
        toast.success(`Registry is now ${isPublic ? 'public' : 'private'}`);
      }
    } catch (error) {
      toast.error('Failed to update access settings');
    } finally {
      setIsUpdatingAccess(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[60vh] overflow-y-auto pb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-medium text-black-400">Share your Registry</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="px-5 space-y-6">

            <p className="text-sm text-gray-600">
              Send your registry to friends and family so they can shop gifts for your special event
            </p>
            
            {/* Registry Link */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
              <label className="block text-black-400">
                Registry Link:
              </label>
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 pl-3 py-2 rounded-md text-sm text-blue-800 select-all w-64 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="pr-3 py-2 rounded-md transition-all duration-200 text-black-100"
                >
                  {copied ? (
                    <FaCheck className="h-4 w-4" />
                  ) : (
                    <IoCopyOutline className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Share Options */}
            <div className='flex items-center gap-2'>
              <label className="block text-black-400">
                Share Options:
              </label>
              <div className="flex gap-3 items-center">
                <button
                  onClick={shareViaWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </button>
                
                <button
                  onClick={shareViaFacebook}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FaFacebookF className="h-5 w-5" />
                </button>
                
                <button
                  onClick={shareViaEmail}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  <FaEnvelope className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Manage Access */}
            <div className='border-t pt-4 border-t-gray-200'>
              <label className="block text-black-400 mb-3">
                Manage Access
              </label>

              <div className="space-y-2">
                <button
                //   onClick={() => handleAccessChange(true)}
                  disabled={isUpdatingAccess}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-1 text-left">
                    <FaLink className="h-3 w-3 text-black-100" />
                    <p className="font-medium text-black-400 text-sm">Public:</p>
                    <p className="text-sm text-black-100">Anyone with link can view</p>
                  </div>
{/* 
                  {registry.is_public && (
                    <div className="p-1">
                      <FaCheck className="h-4 w-4 text-green-600" />
                    </div>
                  )} */}
                </button>
                
                <button
                //   onClick={() => handleAccessChange(false)}
                  disabled={isUpdatingAccess}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-1 text-left">
                    <FaLink className="h-3 w-3 text-black-100" />
                    <p className="font-medium text-black-400 text-sm">Private: </p>
                    <p className="text-sm text-black-100">Only people you invite</p>
                  </div>
                  {/* {!registry.is_public && (
                    <div className="p-1">
                      <FaCheck className="h-4 w-4 text-blue-600" />
                    </div>
                  )} */}
                </button>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </>
  );
};

export default ShareRegistryModal;