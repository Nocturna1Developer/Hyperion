
/*
getSongById.ts:

This is a helper function to fetch a song by its unique ID from the database.
It uses the Supabase client to interact with the database.
Details:

The function takes an 'id' as a parameter, which is the unique identifier for the song.
It uses the 'createServerComponentClient' function from the 'supabase/auth-helpers-nextjs' package to create a Supabase client with the necessary cookies.
It then calls the 'from' method on the client with 'songs' as the argument to select the 'songs' table.
It uses the 'select' method to select all fields from the 'songs' table.
The 'eq' method is used to filter songs based on the 'id' passed to the function.
The 'single' method is used to return only one matching record.
If an error occurs during the database operation, the error message is logged to the console.
The function returns the fetched song or an empty array if no song is found.
*/
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongById = async (id: string): Promise<Song> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongById;