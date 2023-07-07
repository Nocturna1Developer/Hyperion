/*
ModalProvider.tsx:

- The ModalProvider component is a wrapper component that ensures that all of its children (which are modals) are mounted and ready before rendering them.
- It takes a single prop: 'products', which is a list of products passed to the 'SubscribeModal'.
- The component manages a state 'isMounted' that checks whether the component has been mounted to the DOM.

Details:

- useEffect hook is used to set 'isMounted' to true after the initial render, ensuring that the modals are only rendered after the component has been mounted to the DOM.
- If 'isMounted' is false, it returns null, effectively rendering nothing.
- If 'isMounted' is true, it renders all of its children: AuthModal, SubscribeModal, and UploadModal.
*/

"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";

// Define the props expected by the ModalProvider component
interface ModalProviderProps {
    products: ProductWithPrice[];
}

// Define the ModalProvider component
const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
    // Define a state variable to check if the component has been mounted
    const [isMounted, setIsMounted] = useState(false);

    // After the initial render, set 'isMounted' to true
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not mounted, return null and render nothing
    if (!isMounted) {
        return null;
    }

    // Once the component is mounted, render the modals
    // In React, comments inside JSX should be placed within curly braces and should use the JavaScript comment syntax.
    return (
        <>
            {/* AuthModal doesn't require any props */}
            <AuthModal />
            {/* Pass 'products' as props to SubscribeModal */}
            <SubscribeModal products={products} />
            {/* UploadModal doesn't require any props */}
            <UploadModal />
        </>
    );
}

export default ModalProvider;
