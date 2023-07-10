/*
useUploadModal.ts:

- This is a state management hook created with Zustand that controls the open/close state of an upload modal.
- The Zustand store has the state 'isOpen' and functions 'onOpen' and 'onClose' to control this state.

Details:

- The 'isOpen' state is a boolean that represents whether the upload modal is open or not.
- The 'onOpen' function sets 'isOpen' to true, meaning the modal is open.
- The 'onClose' function sets 'isOpen' to false, meaning the modal is closed.
- This Zustand store is exported as a hook named 'useUploadModal', which can be used in other components to control the state of the upload modal.
*/

// Import the create function from 'zustand', a lightweight state management tool.
import { create } from 'zustand';

// Define the types for the UploadModalStore state
interface UploadModalStore {
    isOpen: boolean; // State that represents whether the modal is open
    onOpen: () => void; // Function to open the modal
    onClose: () => void; // Function to close the modal
}

// Create the Zustand store for the UploadModalStore
const useUploadModal = create<UploadModalStore>((set) => ({
    isOpen: false, // Initialize the isOpen state to false
    onOpen: () => set({ isOpen: true }), // Function to set isOpen state to true
    onClose: () => set({ isOpen: false }), // Function to set isOpen state to false
}));

// Export the useUploadModal hook so it can be used in other components
export default useUploadModal;
