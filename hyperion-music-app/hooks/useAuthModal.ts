/*
useAuthModal.tsx:

- This hook creates a Zustand store for managing the state of the authentication modal in the application.
- The Zustand store exposes an 'isOpen' boolean state, and two methods 'onOpen' and 'onClose' to handle the opening and closing of the modal.

Details:

- The 'isOpen' state is initialized as 'false', meaning the modal is not open by default.
- The 'onOpen' method is a function that sets 'isOpen' to 'true', effectively opening the modal.
- The 'onClose' method is a function that sets 'isOpen' to 'false', effectively closing the modal.
*/

import { create } from 'zustand';

// Define the state shape and actions for the Zustand store
interface AuthModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// Create the Zustand store using the defined state shape and actions
const useAuthModal = create<AuthModalStore>((set) => ({
    // Modal is not open by default
    isOpen: false,
    // Method to open the modal by setting 'isOpen' to 'true'
    onOpen: () => set({ isOpen: true }),
    // Method to close the modal by setting 'isOpen' to 'false'
    onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
