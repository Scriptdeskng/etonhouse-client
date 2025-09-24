'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarDays } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Entrance from '@/animated/Entrance';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useCreateRegistry } from '@/services/registry.service';
import toast from 'react-hot-toast';
import { CreateRegistryInput } from '@/types/registry';
import { useEffect } from "react";
import useAuthStore from '@/store/authStore';

const CreateRegistry: React.FC = () => {
    const router = useRouter();
    const createRegistryMutation = useCreateRegistry();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/account?redirect=registry');
        }
    }, [isAuthenticated, router]);

    const [formData, setFormData] = useState<{
        name: string;
        type: 'wedding' | 'baby-shower' | 'birthday' | 'housewarming' | 'graduation' | 'other';
        date: string;
        description: string;
        coverImage: File | null;
        isPublic: boolean;
        deliveryAddress: string;
    }>({
        name: '',
        type: 'wedding',
        date: '',
        description: '',
        coverImage: null,
        isPublic: true,
        deliveryAddress: ''
    });

    const [dragActive, setDragActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAccessTypeChange = (isPublic: boolean) => {
        setFormData(prev => ({
            ...prev,
            isPublic
        }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file: File) => {
        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        setFormData(prev => ({
            ...prev,
            coverImage: file
        }));
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            coverImage: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            toast.error('Registry name is required');
            return;
        }

        if (!formData.type) {
            toast.error('Please select a registry type');
            return;
        }

        if (!formData.date) {
            toast.error('Please select an event date');
            return;
        }

        if (!formData.deliveryAddress.trim()) {
            toast.error('Delivery address is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const registryData: CreateRegistryInput = {
                name: formData.name.trim(),
                type: formData.type,
                date: formData.date,
                description: formData.description.trim() || '',
                is_public: formData.isPublic,
                delivery_address: formData.deliveryAddress.trim() || 'Not specified'
            };

            if (formData.coverImage) {
                registryData.cover_image = formData.coverImage;
            }

            console.log('Submitting registry data:', {
                ...registryData,
                cover_image: registryData.cover_image ? 'File included' : 'No file'
            });

            const response = await createRegistryMutation.mutateAsync(registryData);

            console.log('Registry created successfully:', response);
            toast.success('Registry created successfully!');

            router.push(`/registry/catalog?registryId=${response.id}`);
        } catch (error: any) {
            console.error('Error creating registry:', error);

            if (error?.response?.status === 500) {
                toast.error('Server error. Please try again without an image or contact support.');
            } else if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error?.response?.data) {
                const errorData = error.response.data;
                if (typeof errorData === 'string' && errorData.includes('<!doctype html>')) {
                    toast.error('Server configuration error. Please contact support.');
                } else if (typeof errorData === 'object') {
                    const firstError = Object.values(errorData)[0];
                    toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
                } else {
                    toast.error('Failed to create registry. Please check all fields.');
                }
            } else {
                toast.error('Failed to create registry. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Entrance>
            <Navbar active={5} />
            <div className="max-w-[1536px] mx-auto px-5 sm:px-10 lg:px-20 pt-10 pb-32">
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">Create Your Gift Registry</h1>

                <form onSubmit={handleSubmit} className="pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Registry Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#F9FAFC] placeholder:text-[#7E7C81] rounded-md focus:outline-none"
                                placeholder="e.g., Tolu & Bayo's Wedding"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                Registry Type *
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#F9FAFC] placeholder:text-[#7E7C81] rounded-md focus:outline-none"
                                required
                            >
                                <option value="wedding">Wedding</option>
                                <option value="baby-shower">Baby Shower</option>
                                <option value="birthday">Birthday</option>
                                <option value="housewarming">Housewarming</option>
                                <option value="graduation">Graduation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Event Date *
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 pr-10 bg-[#F9FAFC] placeholder:text-[#7E7C81] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <FaCalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
                                Delivery Address *
                            </label>
                            <input
                                id="deliveryAddress"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-[#F9FAFC] placeholder:text-[#7E7C81] rounded-md focus:outline-none"
                                placeholder="Enter delivery address for gifts..."
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">This address will be used for gift deliveries</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#F9FAFC] placeholder:text-[#7E7C81] rounded-md focus:outline-none"
                            placeholder="Tell us about your special event..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Cover Image (Optional)
                        </label>
                        <p className="text-xs text-gray-500 mb-3">(Recommended: 900px × 1100px, Max file size: 5MB)</p>

                        {formData.coverImage ? (
                            <div className="relative">
                                <div className="flex items-center p-4 bg-[#F9FAFC] border border-gray-300 rounded-md">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{formData.coverImage.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {(formData.coverImage.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="ml-4 p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <IoMdClose className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`relative border-2 border-dashed bg-[#F9FAFC] rounded-md p-6 ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="text-center">
                                    <IoCloudUploadOutline className="mx-auto h-8 w-8 text-black-100" />
                                    <div className="mt-4">
                                        <span className="mt-2 block text-black-100">
                                            Drop files here or click to upload
                                        </span>
                                        <span className="mt-2 block text-sm text-black-100">
                                            Recommended dimension: 900px x 1100px
                                        </span>
                                        <span className="mt-2 block text-sm text-black-100">
                                            PNG, JPG, GIF up to 5MB
                                        </span>
                                    </div>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    id="coverImage"
                                    name="coverImage"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        )}
                    </div>

                    <div className='my-6'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Manage Access
                        </label>
                        <div className="sm:flex sm:items-center sm:gap-10 w-full">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="accessType"
                                    value="public"
                                    checked={formData.isPublic === true}
                                    onChange={() => handleAccessTypeChange(true)}
                                    className="h-4 w-4 text-black-100 focus:ring-black-400 border-gray-300"
                                />
                                <span className="ml-1 text-sm text-gray-700">
                                    Public (anyone with the link can view)
                                </span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="accessType"
                                    value="private"
                                    checked={formData.isPublic === false}
                                    onChange={() => handleAccessTypeChange(false)}
                                    className="h-4 w-4 text-black-100 focus:ring-black-400 border-gray-300"
                                />
                                <span className="ml-1 text-sm text-gray-700">
                                    Private (only invited people can view)
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black-400 text-white py-3 px-4 focus:outline-none transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating Registry...' : 'Continue to Add Items'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </Entrance>
    );
};

export default CreateRegistry;