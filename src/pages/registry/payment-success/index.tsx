'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Entrance from '@/animated/Entrance';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Button from '@/utils/button';
import { FaCheckCircle, FaGift } from 'react-icons/fa';
import { useSingleRegistry } from '@/services/registry.service';
import Skeleton from 'react-loading-skeleton';

const RegistryPaymentSuccess: React.FC = () => {
  const router = useRouter();
  const { registryId, reference, purchaseId } = router.query;
  
  const [showConfetti, setShowConfetti] = useState(true);
  const { data: registry, isLoading } = useSingleRegistry(registryId as string);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showConfetti) return;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiElements: HTMLDivElement[] = [];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.opacity = '1';
      confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      confetti.style.transition = 'all 3s ease-out';
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);
      confettiElements.push(confetti);

      setTimeout(() => {
        confetti.style.top = '100vh';
        confetti.style.opacity = '0';
      }, 50);
    }

    return () => {
      confettiElements.forEach(el => el.remove());
    };
  }, [showConfetti]);

  if (isLoading) {
    return (
      <Entrance>
        <Navbar active={4} />
        <div className="min-h-screen max-w-2xl mx-auto px-5 py-12">
          <Skeleton height={400} />
        </div>
        <Footer />
      </Entrance>
    );
  }

  return (
    <Entrance>
      <Navbar active={4} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <FaGift className="absolute -bottom-2 -right-2 text-4xl text-purple-500" />
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Purchase!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Your gift will be delivered directly to {registry?.name}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </Entrance>
  );
};

export default RegistryPaymentSuccess;