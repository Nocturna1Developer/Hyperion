/*
useSubscribeModal.ts:

This is a Zustand store module for managing the state of a subscription modal.
It maintains an isOpen boolean flag that represents whether the modal is open or not.
It provides two actions onOpen and onClose to open and close the modal respectively.
Details:

The SubscribeModalStore interface defines the shape of the store which includes the isOpen flag and two actions.
The useSubscribeModal function creates a Zustand store with the defined shape and initial state.
*/

import { create } from 'zustand';

interface SubscribeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// Create a Zustand store for managing the subscription modal state
const useSubscribeModal = create<SubscribeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;