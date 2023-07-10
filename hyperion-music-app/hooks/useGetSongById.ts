/*
useSongById.ts:

- This is a custom React Hook that fetches a specific song from a database using the Supabase client.
- The hook makes use of React's useEffect and useState hooks to manage fetching data and its state.
- It also uses useMemo to return a memoized version of the state values, improving performance by preventing unnecessary re-rendering.

Details:

- The 'isLoading' state is used to indicate whether the song fetching operation is in progress or not.
- The 'song' state is used to hold the data of the fetched song.
- The 'id' parameter is the id of the song that is to be fetched.
- The 'supabaseClient' from 'useSessionContext' is used to interact with the Supabase database.
- The useEffect hook is used to perform the fetching operation whenever the 'id' or the 'supabaseClient' changes.
- The fetching operation involves sending a 'select' request to the 'songs' table in the Supabase database where the 'id' of the song equals the 'id' passed to the hook.
- Errors during the fetching operation are handled by displaying a toast notification with the error message.
*/

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
    // Initialize states for loading status and song data
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);

    // Access Supabase client from the session context
    const { supabaseClient } = useSessionContext();

    // Use the useEffect hook to fetch song data whenever the id changes
    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true); // Set loading status to true

        const fetchSong = async () => {
            // Fetch the song from the database
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single();

            // If there is an error, display a toast notification and stop loading
            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong(data as Song); // Update the song state with the fetched data
            setIsLoading(false); // Set loading status to false
        }

        fetchSong(); // Execute the fetchSong function
    }, [id, supabaseClient]);

    // Return a memoized object containing the loading status and song data
    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
};

export default useSongById; // Export the custom hook
