/**
 * getSongs.ts
 * 
 * This script retrieves a list of songs from the Supabase database.
 * 
 * Functionality:
 * - It uses the Supabase client created specifically for server components.
 * - This client includes 'cookies' as an argument to handle user sessions on the server.
 * - The 'getSongs' function is an asynchronous function that makes a request to Supabase to retrieve all songs.
 * - The songs are returned in descending order of creation.
 * - If there's an error during the database request, the error message is logged to the console.
 * - The function ultimately returns an array of songs. If no data is retrieved, an empty array is returned.
 */

// Import necessary modules
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Import type for Song
import { Song } from "@/types";

// Define the asynchronous function to get songs from the database
const getSongs = async (): Promise<Song[]> => {
    // Create the Supabase client for server components, passing cookies to handle user sessions on the server
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Make a request to Supabase to retrieve all songs in descending order of creation
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    // If there's an error during the database request, log the error message to the console
    if (error) {
        console.log(error.message);
    }

    // Return the data as an array of Song objects. If no data is retrieved, return an empty array
    return (data as any) || [];
};

// Export the getSongs function
export default getSongs;
