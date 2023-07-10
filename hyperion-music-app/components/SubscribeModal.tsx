/*
SubscribeModal.tsx:

This component renders a modal for handling the subscription of a user to premium products.
It uses hooks for modal and user context management and makes use of helper functions for processing payments.
The modal shows available products and their prices and enables users to checkout and subscribe.
Details:

The SubscribeModalProps interface expects an array of products with associated prices.
The formatPrice function is used to format the prices for displaying.
The SubscribeModal component hooks into the user context and modal context.
If the user isn't logged in or is already subscribed, appropriate messages are displayed.
On click of a product's "Subscribe" button, handleCheckout function is called which sends a POST request to '/api/create-checkout-session' with the selected product's price as body. A Stripe session is created for the checkout and the user is redirected to it.
If there are no available products, a message stating "No products available." is shown.
If the user is already subscribed, a message stating "Already subscribed." is shown.
*/
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import { Price, ProductWithPrice } from '@/types';

import Modal from './Modal';
import Button from './Button';

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {
    // Hook into the subscribe modal context
    const subscribeModal = useSubscribeModal();

    // Hook into the user context
    const { user, isLoading, subscription } = useUser();

    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    // Function to handle changes in the modal state
    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose();
        }
    }

    // Function to handle checkout process
    const handleCheckout = async (price: Price) => {
        // Set loading state
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast('Already subscribed');
        }

        try {
            // Create a checkout session
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            // Redirect to Stripe checkout
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            return toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    // Content to be displayed in the modal
    let content = (
        <div className="text-center">
            No products available.
        </div>
    )

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                Already subscribed.
            </div>
        )
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Hyperion Gold Plan"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
}

export default SubscribeModal;
