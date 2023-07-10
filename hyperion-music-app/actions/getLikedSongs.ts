/*
getLikedSongs.ts:

- This function fetches all the songs that the currently authenticated user has liked.
- The function uses Supabase, a Firebase-like suite of tools that includes a PostgreSQL database, to fetch the data.
- It uses the session data from the Supabase auth module to identify the user.
- It returns a Promise that resolves to an array of Song objects, each of which represents a song that the user has liked.

Details:

- The function first initializes a Supabase client using the `createServerComponentClient` function. The client is configured with the cookies from the request headers.
- It then gets the current session using the `getSession` method from the Supabase auth object.
- It queries the 'liked_songs' table in the database to get all the songs that the user has liked.
- It maps over the returned data and returns an array of Song objects.
- If no data is returned from the database, the function returns an empty array.
*/

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    // Create a new Supabase client using the user's cookies
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Get the current session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Query the 'liked_songs' table in the database for all songs liked by the user
    const { data } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })

    // If no data was returned from the database, return an empty array
    if (!data) return [];

    // Return an array of Song objects representing the songs liked by the user
    return data.map((item) => ({
        ...item.songs
    }))
};

export default getLikedSongs;
