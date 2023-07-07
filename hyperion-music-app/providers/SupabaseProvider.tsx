/*
SupabaseProvider.tsx:

- The SupabaseProvider component is a wrapper component that provides access to the Supabase client and the Supabase session context to its children.
- It uses the 'createClientComponentClient' from '@supabase/auth-helpers-nextjs' to create the Supabase client and the 'SessionContextProvider' from '@supabase/auth-helpers-react' to provide the Supabase session context.
- It takes a single prop: 'children', which can be any valid React nodes.

Details:

- The component initializes the Supabase client using the useState hook, which ensures that the client is only created once and persists across re-renders.
- It wraps its children with 'SessionContextProvider' and provides the initialized Supabase client as a prop to the provider. This makes the Supabase client and session context available to all child components.
*/

"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    // Initialize the Supabase client. useState ensures that the client is created only once and persists across re-renders
    const [supabaseClient] = useState(() => createClientComponentClient<Database>());

    // Wrap children with the SessionContextProvider, providing the Supabase client to the provider
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}

export default SupabaseProvider;
