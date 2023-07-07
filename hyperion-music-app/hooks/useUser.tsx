/*
UserContext.tsx:

- The UserContext.tsx module provides a context and related utilities for managing and accessing user-related data within the application.
- It exports a React context (`UserContext`), a context provider component (`MyUserContextProvider`), and a custom hook (`useUser`) that is designed for easy access to the context in the functional components of the application.
- The provider component fetches user data and subscription status from a Supabase client and updates the context state whenever a change occurs.
- The custom hook (`useUser`) encapsulates the logic for accessing the user context data and throws an error when used outside of a context provider.

Details:

- The module starts by importing necessary dependencies, including hooks and types from Supabase libraries and local type definitions.
- The context and provider component are defined using React's `createContext` and functional component methods respectively.
- The provider component fetches user details and subscription data from a Supabase client and provides these data points through the context state.
- The `useEffect` hook in the provider component keeps track of user changes and fetches new data when a change is detected.
- The custom hook (`useUser`) uses React's `useContext` to access the context state and provide it to the components where it is called.
*/

import { useEffect, useState, createContext, useContext } from 'react';
import {
    useUser as useSupaUser,
    useSessionContext,
    User
} from '@supabase/auth-helpers-react';
import { UserDetails, Subscription } from '@/types';

// Define the structure for the UserContext.
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

// Create a new context for user data
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

// Define a type for the component props
export interface Props {
    [propName: string]: any;
}

// Define a context provider that fetches and provides user details and their subscription.
export const MyUserContextProvider = (props: Props) => {
    // Get user and session information from Supabase
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();

    // Use Supabase's custom hook to get user object
    const user = useSupaUser();

    // Extract access token from the session
    const accessToken = session?.access_token ?? null;

    // Define states for loading data, user details, and subscription
    const [isLoadingData, setIsloadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    // Define helper functions to get user details and subscription from Supabase
    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single();

    // Use effect hook to handle changes in user and fetch user details and subscription accordingly
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsloadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                // Set user details and subscription based on the fulfilled promises
                if (userDetailsPromise.status === 'fulfilled') setUserDetails(userDetailsPromise.value.data as UserDetails);
                if (subscriptionPromise.status === 'fulfilled') setSubscription(subscriptionPromise.value.data as Subscription);

                setIsloadingData(false);
            });
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // Clear user details and subscription if user doesn't exist
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    // Define the value to be provided via context
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    // Return a UserContext.Provider with the value.
    return <UserContext.Provider value={value} {...props} />;
};

// Define a custom hook for easy access to the UserContext.
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};
