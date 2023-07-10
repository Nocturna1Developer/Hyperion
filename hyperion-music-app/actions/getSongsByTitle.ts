/**
 * getSongsByTitle.ts
 *
 * This script exports a function 'getSongsByTitle' that fetches and returns songs from a Supabase database by their title.
 * It uses the '@supabase/auth-helpers-nextjs' package to create a Supabase client for server-side components, and it uses the Supabase client to query the 'songs' table.
 * If a title is provided, it queries for songs with a title similar to the provided title.
 * If no title is provided, it fetches all songs by calling the 'getSongs' function.
 * The songs are returned in descending order by their creation date.
 *
 * Details:
 *
 * - The Supabase client is created by calling 'createServerComponentClient' with an options object that includes cookies.
 * - The 'getSongs' function is called to fetch all songs when no title is provided.
 * - When a title is provided, the Supabase client queries the 'songs' table for songs with similar titles using the 'ilike' function.
 * - The returned songs are ordered by their creation date in descending order.
 * - If an error occurs during the query, the error message is logged to the console.
 * - Finally, the function returns the fetched songs or an empty array if an error occurred.
 */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    // Create a Supabase client for server-side components
    const supabase = createServerComponentClient({ cookies });

    // If no title is provided, fetch all songs
    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    // Query the 'songs' table for songs with similar titles
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false })

    // Log the error message to the console if an error occurred during the query
    if (error) {
        console.log(error.message);
    }

    // Return the fetched songs or an empty array if an error occurred
    return data || [];
};

export default getSongsByTitle;
