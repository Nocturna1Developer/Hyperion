
/*
getSongsByUserId.ts:

This script fetches the songs of a specific user by their ID from the database.
It uses the 'createServerComponentClient' function from the '@supabase/auth-helpers-nextjs' library to create a Supabase client.
It calls the 'getSession' method on Supabase's 'auth' object to fetch the current session and hence, the user ID.
The function then fetches the songs associated with this user ID from the 'songs' table in the database.
Details:

The 'createServerComponentClient' function is used to create a Supabase client.
The 'getSession' method is used to fetch the current session data, which includes the user ID.
If there's an error fetching the session data, an error message is logged, and an empty array is returned.
If the session data is successfully fetched, the function fetches all songs associated with the user ID from the 'songs' table.
The songs are ordered by the 'created_at' field in descending order.
If there's an error fetching the songs, an error message is logged.
Finally, the function returns the fetched songs or an empty array if no songs were found.
*/

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongsByUserId = async (): Promise<Song[]> => {
    // Create a Supabase client using the 'createServerComponentClient()' function and pass in the cookies
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Call the 'getSession()' method on the Supabase client's 'auth' object to get the current session data
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    // If there's an error fetching the session data, log the error message and return an empty array
    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    // Fetch the songs associated with the user ID from the 'songs' table in the database
    // Order the songs by the 'created_at' field in descending order
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false })

    // If there's an error fetching the songs, log the error message
    if (error) {
        console.log(error.message);
    }

    // Return the fetched songs or an empty array if no songs were found
    return (data as any) || [];
};

export default getSongsByUserId;