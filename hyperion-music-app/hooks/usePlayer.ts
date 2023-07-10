/*
usePlayer.ts:

- This is a custom hook that uses Zustand state management library to manage the state of a media player.
- The Zustand store here is created with 'create' function from the Zustand library.
- The store consists of an array of song ids, the id of the currently active song, and methods to manipulate these data.

Details:

- The 'ids' array is used to keep track of the song ids in the current playlist.
- The 'activeId' is used to manage the id of the currently playing song.
- The 'setId' function is used to update the id of the currently playing song.
- The 'setIds' function is used to update the playlist with a new set of song ids.
- The 'reset' function is used to reset the playlist and the currently playing song id to their initial state.

*/

import { create } from 'zustand';

// Define the shape of the state for the player store
interface PlayerStore {
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

// Create the state store using Zustand
const usePlayer = create<PlayerStore>((set) => ({
    ids: [], // Array to hold the ids of the songs in the current playlist
    activeId: undefined, // The id of the currently playing song
    setId: (id: string) => set({ activeId: id }), // Function to update the id of the currently playing song
    setIds: (ids: string[]) => set({ ids }), // Function to update the song ids in the playlist
    reset: () => set({ ids: [], activeId: undefined }) // Function to reset the state to its initial state
}));

export default usePlayer; // Export the custom hook
