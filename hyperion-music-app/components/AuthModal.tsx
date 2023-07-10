/*
AuthModal.tsx:

- This is a component that renders an authentication modal using the Supabase Auth UI.
- It uses the 'useSessionContext' hook to access the Supabase session, the 'useRouter' hook to interact with the Next.js router, and a custom 'useAuthModal' hook to control the opening and closing of the modal.
- It utilizes the useEffect hook to listen to changes in the session, closing the modal and refreshing the page when a session is established.

Details:

- The component is rendered inside a Modal component, with a title of "Welcome back" and a description of "Login to your account.".
- The authentication providers are set to 'github' and 'magicLink' is enabled.
- The appearance theme is set to 'ThemeSupa', with brand colors defined.
*/

"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
    useSessionContext,
    useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
    // Access the current session, Supabase client, and modal state
    const { session } = useSessionContext();
    const router = useRouter();
    const { onClose, isOpen } = useAuthModal();
    const supabaseClient = useSupabaseClient();

    // When a session is established, close the modal and refresh the page
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    // Handle modal state changes, close the modal if it's not open
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    // Render the Modal with Supabase Auth UI
    return (
        <Modal
            title="Welcome back"
            description="Login to your account."
            isOpen={isOpen}
            onChange={onChange} // Handle modal state changes
        >
            <Auth
                supabaseClient={supabaseClient}
                providers={['github']} // Authentication providers
                magicLink={true} // Enable magic link
                appearance={{ // Define appearance
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#4B0082'
                            }
                        }
                    }
                }}
                theme="dark" // Set theme to dark
            />
        </Modal>
    );
}

export default AuthModal;
