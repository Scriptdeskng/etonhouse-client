'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Entrance from '@/animated/Entrance';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Input from '@/utils/inputs/input';
import Button from '@/utils/button';
import RadioInput from '@/utils/inputs/radio';
import Checkbox from '@/utils/inputs/checkbox';
import { useSingleRegistry, useCreateRegistryPurchase } from '@/services/registry.service';
import { useInitializePayment } from '@/services/order.service';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

interface RegistryCheckoutForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

const methods = [
    { label: "Novac Payment (Recommended)", value: "nova" },
    { label: "Mobile Wallet (Paystack)", value: "paystack" },
];

const RegistryCheckout: React.FC = () => {
    const router = useRouter();
    const { registryId, itemId, quantity } = router.query;

    const [paymentMethod, setPaymentMethod] = useState("nova");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { data: registry, isLoading: registryLoading } = useSingleRegistry(registryId as string);
    const createPurchase = useCreateRegistryPurchase();
    const initializePayment = useInitializePayment();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistryCheckoutForm>({
        mode: "onBlur",
    });

    const registryItem = registry?.items?.find((item: any) => item.id === Number(itemId));
    const purchaseQuantity = Number(quantity) || 1;
    const totalPrice = registryItem ? Number(registryItem.product_price) * purchaseQuantity : 0;

    useEffect(() => {
        if (!registryId || !itemId || !quantity) {
            toast.error('Invalid checkout data');
            router.push('/registry');
        }
    }, [registryId, itemId, quantity, router]);

    const onSubmit = async (data: RegistryCheckoutForm) => {
        if (!paymentMethod.trim()) {
            toast.error("Please select a payment method");
            return;
        }

        if (!agreedToTerms) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        try {
            const purchaseData = {
                registry_item: Number(itemId),
                buyer: `${data.firstName} ${data.lastName}`,
                message: data.message || '',
                quantity: purchaseQuantity,
            };

            const purchaseResponse = await createPurchase.mutateAsync(purchaseData);

            const paymentData = {
                email: data.email,
                order_id: purchaseResponse.id,
                reference: `REG_${purchaseResponse.id}_${Date.now()}`,
                payment_method: paymentMethod,
                amount: totalPrice,
                metadata: {
                    buyer_name: `${data.firstName} ${data.lastName}`,
                    buyer_email: data.email,
                    buyer_phone: data.phone,
                    registry_id: registryId,
                    registry_name: registry?.name,
                    item_name: registryItem?.product,
                    delivery_address: `${registry?.delivery_address}, ${registry?.delivery_city}, ${registry?.delivery_state}`,
                }
            };

            const paymentResponse = await initializePayment.mutateAsync(paymentData);

            if (paymentResponse?.data?.authorization_url) {
                toast.success("Redirecting to payment...");
                window.location.href = paymentResponse.data.authorization_url;
            } else {
                toast.error("Payment initialization failed");
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            toast.error(error?.response?.data?.message || "Failed to process checkout");
        }
    };

    if (registryLoading) {
        return (
            <Entrance>
                <Navbar active={4} />
                <div className="min-h-screen max-w-[1200px] mx-auto px-5 py-12">
                    <Skeleton height={600} />
                </div>
                <Footer />
            </Entrance>
        );
    }

    if (!registryItem) {
        return (
            <Entrance>
                <Navbar active={4} />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
                        <Button
                            text="Back to Registry"
                            handleClick={() => router.push(`/registry/${registryId}`)}
                        />
                    </div>
                </div>
                <Footer />
            </Entrance>
        );
    }

    return (
        <Entrance>
            <Navbar active={4} />

            <div className="min-h-screen bg-gray-50 py-10 px-5 sm:px-10 lg:px-20">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-xl lg:text-2xl font-bold mb-8 bg-[#D6DDD6] w-full h-14 flex items-center px-6">
                        Checkout
                    </h1>

                    <h2 className="text-lg mb-3 flex items-center gap-2">
                        📍 Delivery is made to Registry owner’s address
                    </h2>

                    <p className='text-sm mb-5 text-black-100'>This gift will be delivered directly to {registry?.name}’s saved registry address.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-bold mb-4">Gift Item</h2>
                            <div className="flex gap-6">
                                <div className="w-32 h-32 flex-shrink-0">
                                    <Image
                                        src={registryItem.product_image || '/placeholder.png'}
                                        alt={registryItem.product}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-contain border border-gray-200 rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">{registryItem.product}</h3>
                                    <p className="text-gray-600 mb-2">
                                        Price: ₦{Number(registryItem.product_price).toLocaleString('en-GB')}
                                    </p>
                                    <p className="text-gray-600 mb-2">Quantity: {purchaseQuantity}</p>
                                    <p className="text-xl font-bold text-black-400">
                                        Total: ₦{totalPrice.toLocaleString('en-GB')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="w-full h-14 bg-[#D6DDD6] flex items-center px-6 -mx-6 -mt-6 mb-6">
                                <p className="text-[#141414] font-bold">YOUR INFORMATION</p>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                We need your contact information for order confirmation and updates.
                            </p>

                            <div className="space-y-4">
                                <Input
                                    label="First Name *"
                                    placeholder="Enter your first name"
                                    register={register("firstName", {
                                        required: "First name is required",
                                    })}
                                    error={errors?.firstName}
                                />

                                <Input
                                    label="Last Name *"
                                    placeholder="Enter your last name"
                                    register={register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    error={errors?.lastName}
                                />

                                <Input
                                    label="Email Address *"
                                    type="email"
                                    placeholder="Enter your email address"
                                    register={register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={errors?.email}
                                />

                                <Input
                                    label="Phone Number *"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    register={register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\+?[0-9\s\-]{7,15}$/,
                                            message: "Invalid phone number",
                                        },
                                    })}
                                    error={errors?.phone}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gift Message (Optional)
                                    </label>
                                    <textarea
                                        {...register("message")}
                                        placeholder="Add a personal message for the recipient..."
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="w-full h-14 bg-[#D6DDD6] flex items-center px-6 -mx-6 -mt-6 mb-6">
                                <p className="text-[#141414] font-bold">PAYMENT METHOD</p>
                            </div>

                            <p className="lg:text-lg font-medium text-[#333333] mb-4">
                                💳 Choose how you'd like to pay
                            </p>

                            <div className="space-y-4">
                                {methods.map((item) => (
                                    <RadioInput
                                        key={item.value}
                                        label={item.label}
                                        name="payment"
                                        value={item.value}
                                        checked={paymentMethod === item.value}
                                        onChecked={(e) => setPaymentMethod(e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                            <Checkbox
                                id="terms"
                                label="I agree to the Terms & Conditions"
                                name="terms"
                                value={agreedToTerms}
                                onChecked={(e) => setAgreedToTerms(e.target.checked)}
                            />

                            <Button
                                type="submit"
                                text={
                                    createPurchase.isPending || initializePayment.isPending
                                        ? "Processing..."
                                        : `Pay ₦${totalPrice.toLocaleString('en-GB')}`
                                }
                                className="w-full !rounded-none !text-base !h-12 !py-0 bg-[#333333] text-white"
                                disabled={createPurchase.isPending || initializePayment.isPending}
                            />
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </Entrance>
    );
};

export default RegistryCheckout;