/*
AccountContent.tsx:

- This is a React Functional Component that constructs the content part of the account settings page.
- The component uses 'useRouter' from 'next/navigation' to handle page routing, 'useUser' to access user data and subscription status, 'useState' and 'useEffect' from React to manage component state and side effects, 'useSubscribeModal' to handle the subscription modal, and 'postData' from '@/libs/helpers' to handle data posting.

Details:

- The component defines a 'redirectToCustomerPortal' function to handle redirecting the user to the customer portal.
- It renders different contents based on the subscription status of the user: If the user does not have an active subscription, it shows a 'Subscribe' button; if the user has an active subscription, it shows their plan details and a button to open the customer portal.
- An useEffect hook is used to redirect the user to the home page if they are not logged in.
*/


// Using the "client" directive to identify the code is run in the client side.
"use client";

// Import required hooks and components.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";

// Define the 'AccountContent' component.
const AccountContent = () => {
    // Initialize the hooks and states.
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();
    const [loading, setLoading] = useState(false);

    // Define useEffect hook to redirect the user to home if not logged in.
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // Define a function to redirect user to the customer portal.
    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) return alert((error as Error).message);
        }
        setLoading(false);
    };

    // Render the component.
    return (
        <div className="mb-7 px-6">
            {/* Render different content based on the subscription status of the user. */}
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan yet, try Hyperion Gold now.</p>
                    <Button
                        onClick={subscribeModal.onOpen}
                        className="w-[300px]"
                    >
                        Subscribe
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on the
                        <b> {subscription?.prices?.products?.name} </b>
                        plan.
                    </p>
                    <Button
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                        className="w-[300px]"
                    >
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
    );
}

// Export the 'AccountContent' component as default.
export default AccountContent;

